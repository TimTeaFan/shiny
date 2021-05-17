import { makeResizeFilter } from "../utils";
import { OutputBinding } from "./output";

class OutputBindingAdapter {
  el: HTMLElement;
  binding: OutputBinding;

  constructor(el: HTMLElement, binding: OutputBinding) {
    this.el = el;
    this.binding = binding;

    // If the binding actually has a resize method, override the prototype of
    // onResize with a version that does a makeResizeFilter on the element.
    if (binding.resize) {
      this.onResize = makeResizeFilter(el, function (width, height) {
        binding.resize(el, width, height);
      });
    }
  }

  getId(): string {
    return this.binding.getId(this.el);
  }
  onValueChange(data): void {
    this.binding.onValueChange(this.el, data);
  }
  onValueError(err): void {
    this.binding.onValueError(this.el, err);
  }
  showProgress(show: boolean): void {
    this.binding.showProgress(this.el, show);
  }
  onResize(): void {
    // Intentionally left blank; see constructor
  }
}

export { OutputBindingAdapter };
