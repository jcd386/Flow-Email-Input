import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
const INVALID_EMAIL_MSG = 'Please enter a valid email address (e.g., name@example.com)';

export default class FlowEmailInput extends LightningElement {
    @api label = 'Email';
    @api required = false;
    @api placeholder = 'you@example.com';
    @api disabled = false;
    @api helpText;
    @api isValid = false;

    _value = '';

    connectedCallback() {
        this.dispatchEvent(new FlowAttributeChangeEvent('isValid', true));
    }

    @api
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val || '';
    }

    @api
    validate() {
        const input = this.template.querySelector('lightning-input');
        const currentValue = (this._value || '').trim();

        if (input) {
            input.setCustomValidity('');
        }

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
                input.setCustomValidity(INVALID_EMAIL_MSG);
                input.reportValidity();
            }
            return {
                isValid: false,
                errorMessage: INVALID_EMAIL_MSG
            };
        }

        if (input) {
            input.reportValidity();
        }
        return { isValid: true };
    }

    handleChange(event) {
        const newValue = event.target.value.trim();
        this._value = newValue;
        this.dispatchEvent(new FlowAttributeChangeEvent('value', newValue));
    }

    handleBlur() {
        const valid = !this._value || EMAIL_REGEX.test(this._value);
        this.dispatchEvent(new FlowAttributeChangeEvent('isValid', valid));
        this._validateAndShowErrors();
    }

    _validateAndShowErrors() {
        const input = this.template.querySelector('lightning-input');
        if (!input) return;

        const currentValue = (this._value || '').trim();
        if (currentValue && !EMAIL_REGEX.test(currentValue)) {
            input.setCustomValidity(INVALID_EMAIL_MSG);
        } else {
            input.setCustomValidity('');
        }
        input.reportValidity();
    }
}
