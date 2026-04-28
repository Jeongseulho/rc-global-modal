import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { ModalController } from '../context/ModalController';

describe('ModalController', () => {
  let controller: ModalController;
  let mockRender: Mock;

  beforeEach(() => {
    controller = new ModalController();
    mockRender = vi.fn();
    controller.setRender(mockRender);
  });

  const MockComponent = () => null;

  describe('initialization', () => {
    it('should initialize with an empty stack', () => {
      expect(controller.stack).toHaveLength(0);
      expect(controller.top).toBeUndefined();
    });
  });

  describe('push', () => {
    it('should push a modal and call render', () => {
      controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      
      expect(controller.stack).toHaveLength(1);
      expect(controller.top.key).toBe('modal1');
      expect(controller.top.isOpen).toBe(true);
      expect(mockRender).toHaveBeenCalledTimes(1);
    });

    it('should reject when exceeding MAX_MODAL_STACK_SIZE', async () => {
      controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      controller.push({ key: 'modal2', Component: MockComponent, props: {} });
      controller.push({ key: 'modal3', Component: MockComponent, props: {} });

      await expect(
        controller.push({ key: 'modal4', Component: MockComponent, props: {} })
      ).rejects.toThrow('모달은 최대 3개까지만 동시에 열 수 있습니다.');
    });
    
    it('should allow pushing if closed modals make up the stack size', async () => {
      controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      controller.push({ key: 'modal2', Component: MockComponent, props: {} });
      controller.push({ key: 'modal3', Component: MockComponent, props: {} });
      
      controller.top.resolve(null); // Close modal3
      
      // Since modal3 is closed, we should be able to push another modal
      controller.push({ key: 'modal4', Component: MockComponent, props: {} });
      
      expect(controller.stack).toHaveLength(4);
      expect(controller.stack.filter(m => m.isOpen)).toHaveLength(3);
    });
  });

  describe('pop', () => {
    it('should reject the top modal and set isOpen to false', () => {
      const promise = controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      
      controller.pop();

      expect(promise).rejects.toMatch('Close modal: modal1');
      // Note: pop itself doesn't remove from stack, it calls reject, which sets isOpen to false.
      // remove is usually called after the animation finishes.
      expect(controller.top.isOpen).toBe(false);
      expect(mockRender).toHaveBeenCalledTimes(2); // push, then reject(handlePromise)
    });
    
    it('should do nothing if stack is empty', () => {
      expect(() => controller.pop()).not.toThrow();
    });
    
    it('should not pop if top modal is already closed', () => {
      controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      controller.top.resolve(null);
      
      expect(mockRender).toHaveBeenCalledTimes(2); // push, resolve
      
      controller.pop();
      
      expect(mockRender).toHaveBeenCalledTimes(2); // No extra render should happen
    });
  });

  describe('clear', () => {
    it('should reject all open modals', () => {
      const promise1 = controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      const promise2 = controller.push({ key: 'modal2', Component: MockComponent, props: {} });

      controller.clear();

      expect(promise1).rejects.toMatch('Clear modal: modal1');
      expect(promise2).rejects.toMatch('Clear modal: modal2');
      
      expect(controller.stack[0].isOpen).toBe(false);
      expect(controller.stack[1].isOpen).toBe(false);
      
      // push * 2, clear calls reject on both which triggers render twice
      expect(mockRender).toHaveBeenCalledTimes(4); 
    });
  });

  describe('remove', () => {
    it('should remove a modal from the stack by key', () => {
      controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      controller.push({ key: 'modal2', Component: MockComponent, props: {} });

      controller.remove('modal1');

      expect(controller.stack).toHaveLength(1);
      expect(controller.top.key).toBe('modal2');
      expect(mockRender).toHaveBeenCalledTimes(3); // push * 2, remove * 1
    });
    
    it('should do nothing if key does not exist', () => {
      controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      
      controller.remove('modal2');
      
      expect(controller.stack).toHaveLength(1);
      expect(mockRender).toHaveBeenCalledTimes(2); // push * 1, remove * 1 (render is called even if nothing is removed based on current implementation)
    });
  });

  describe('promise handling', () => {
    it('should resolve the promise when resolve is called', async () => {
      const promise = controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      
      controller.top.resolve('success');
      
      await expect(promise).resolves.toBe('success');
      expect(controller.top.isOpen).toBe(false);
      expect(mockRender).toHaveBeenCalledTimes(2); // push, then resolve
    });

    it('should reject the promise when reject is called', async () => {
      const promise = controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      
      controller.top.reject('error');
      
      await expect(promise).rejects.toBe('error');
      expect(controller.top.isOpen).toBe(false);
    });

    it('should ignore subsequent resolve/reject if already closed', async () => {
      const promise = controller.push({ key: 'modal1', Component: MockComponent, props: {} });
      
      controller.top.resolve('success');
      controller.top.reject('error');
      controller.top.resolve('success2');
      
      await expect(promise).resolves.toBe('success');
      expect(mockRender).toHaveBeenCalledTimes(2); // push, then first resolve
    });
  });
});
