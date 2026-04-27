import React from 'react';
import { ModalOptions } from '../types/ModalProps';

export type ModalKey = string | number;

export type ExtractResolveType<TProps> = TProps extends {
  resolve: (value: infer R) => void;
}
  ? R
  : never;

export interface ModalStackItem {
  key: ModalKey;
  Component: React.ComponentType<any>;
  props: any;
  options: ModalOptions;
  resolve: (value: any) => void;
  reject: (value: any) => void;
  isOpen: boolean;
}

export class ModalController {
  private readonly MAX_MODAL_STACK_SIZE = 3;
  private modalStack: ModalStackItem[] = [];
  private renderCallback?: () => void;
  
  setRender(callback: () => void) {
    this.renderCallback = callback;
  }
  
  private render() {
    this.renderCallback?.();
  }
  
  get top() {
    return this.modalStack[this.modalStack.length - 1];
  }
  
  get stack() {
    return this.modalStack;
  }
  
  pop() {
    if (this.top && this.top.isOpen) {
      this.top.reject(`Close modal: ${this.top.key}`);
    }
  }
  
  clear() {
    this.modalStack.forEach(item => {
      if (item.isOpen) {
         item.reject(`Clear modal: ${item.key}`);
      }
    });
  }

  push<TProps>(modalInfo: {
    key: ModalKey;
    Component: React.ComponentType<TProps>;
    props: Omit<TProps, 'resolve' | 'reject'>;
    options?: ModalOptions;
  }): Promise<ExtractResolveType<TProps>> {
    if (this.modalStack.filter(m => m.isOpen).length >= this.MAX_MODAL_STACK_SIZE) {
      const error = new Error(`모달은 최대 ${this.MAX_MODAL_STACK_SIZE}개까지만 동시에 열 수 있습니다.`);
      return Promise.reject(error);
    }

    const { key, Component, props, options = {} } = modalInfo;
    return new Promise<ExtractResolveType<TProps>>((resolve, reject) => {
      this.modalStack.push({
        key,
        Component,
        props,
        options,
        isOpen: true,
        resolve: (value: any) => this.handlePromise(key, resolve, value),
        reject: (value: any) => this.handlePromise(key, reject, value),
      });
      this.render();
    });
  }

  private handlePromise(
    key: ModalKey,
    resolver: (value: any) => void,
    value: any,
  ) {
    // Prevent resolving/rejecting multiple times if already closed
    const item = this.modalStack.find((m) => m.key === key);
    if (!item || !item.isOpen) return;

    resolver(value);
    
    item.isOpen = false;
    this.render();
  }

  remove(key: ModalKey) {
    this.modalStack = this.modalStack.filter(({ key: _key }) => key !== _key);
    this.render();
  }
}
