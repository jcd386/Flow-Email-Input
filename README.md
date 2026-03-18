# Flow Email Input

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png)](https://githubsfdeploy.herokuapp.com/app/githubdeploy/jcd386/Flow-Email-Input?ref=main)

A Screen Flow LWC that replaces the default Email component with real email format validation. Validates that input matches a proper email format (e.g., `user@domain.com`) — just like standard Salesforce email fields on objects.

## Features

- **Email format validation** — Requires a valid TLD (rejects `user@domain`, accepts `user@domain.com`)
- **Inline error messages** — Shows validation errors on blur, matching Salesforce's native field behavior
- **Flow navigation blocking** — Invalid emails prevent Next/Finish via the `validate()` Flow hook
- **Drop-in replacement** — Same properties as the default Email component (label, placeholder, required, disabled, help text)
- **Reactive `isValid` output** — Boolean output for conditional Flow logic based on validity

## Installation

### Option A: One-Click Deploy

Click the "Deploy to Salesforce" button above.

### Option B: SFDX CLI

```bash
git clone https://github.com/jcd386/Flow-Email-Input.git
cd Flow-Email-Input
sf project deploy start --target-org YOUR_ORG_ALIAS
```

## Usage

1. Open a Screen Flow in Flow Builder
2. Drag **Flow Email Input** onto a screen (under Custom components)
3. Configure properties:

| Property | Type | Description |
|----------|------|-------------|
| Label | String | Field label (default: "Email") |
| Value | String | Input/output — the email address |
| Required | Boolean | Whether the field is required |
| Placeholder | String | Placeholder text (default: "you@example.com") |
| Disabled | Boolean | Disable the input |
| Help Text | String | Tooltip help text |
| Is Valid | Boolean | Output — `true` when the value is a valid email |

4. Map **Value** to a Flow text variable to capture the email
5. Optionally use **Is Valid** for conditional visibility or branching

## Validation Behavior

| Input | Valid? |
|-------|--------|
| `user@domain.com` | Yes |
| `user+tag@domain.com` | Yes |
| `user@domain.co.uk` | Yes |
| `user@domain` | No — missing TLD |
| `@domain.com` | No — missing local part |
| `user@.com` | No — invalid domain |
| _(empty, not required)_ | Yes |
| _(empty, required)_ | No — blocked |

## Files

| File | Description |
|------|-------------|
| `flowEmailInput.js` | Component logic — validation, Flow hooks, event handling |
| `flowEmailInput.html` | Template — `lightning-input type="email"` |
| `flowEmailInput.js-meta.xml` | Flow Screen target config with input/output properties |

## Author

[We Summit Mountains](https://wesummitmountains.com) — Salesforce Consulting, Dallas TX

## License

MIT
