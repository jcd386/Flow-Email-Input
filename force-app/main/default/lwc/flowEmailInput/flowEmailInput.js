import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default class FlowEmailInput extends LightningElement {
    @api label = 'Email';
    @api required = false;
    @api placeholder = 'you@example.com';
    @api disabled = false;
    @api helpText;
    @api isValid = false;

    _value = '';

    @api
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val || '';
    }

    get emailValue() {
        return this._value;
    }

    @api
    validate() {
        const input = this.template.querySelector('lightning-input');
        const currentValue = (this._value || '').trim();

        if (this.required && !currentValue) {
            if (input) {
                input.reportValidity();
            }
            return {
                isValid: false,
                errorMessage: 'Complete this field.'
            };
        }

        if (!currentValue) {
            return { isValid: true };
        }

        if (!EMAIL_REGEX.test(currentValue)) {
            if (input) {
                input.setCustomValidity('Please enter a valid email address (e.g., name@example.com)');
                input.reportValidity();
            }
            return {
                isValid: false,
                errorMessage: 'Please enter a valid email address (e.g., name@example.com)'
            };
        }

        if (input) {
            input.setCustomValidity('');
            input.reportValidity();
        }
        return { isValid: true };
    }

    handleChange(event) {
        const newValue = event.target.value;
        this._value = newValue;
        this._notifyFlow(newValue);
    }

    handleBlur() {
        this._notifyFlow(this._value);
        this._validateAndShowErrors();
    }

    _notifyFlow(newValue) {
        this.dispatchEvent(new FlowAttributeChangeEvent('value', newValue));
        const valid = !newValue || EMAIL_REGEX.test(newValue);
        this.dispatchEvent(new FlowAttributeChangeEvent('isValid', valid));
    }

    _validateAndShowErrors() {
        const input = this.template.querySelector('lightning-input');
        if (!input) return;

        const currentValue = (this._value || '').trim();
        if (currentValue && !EMAIL_REGEX.test(currentValue)) {
            input.setCustomValidity('Please enter a valid email address (e.g., name@example.com)');
        } else {
            input.setCustomValidity('');
        }
        input.reportValidity();
    }
}
