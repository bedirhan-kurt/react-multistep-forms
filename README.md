# react-multistep-forms

[![npm version](https://img.shields.io/npm/v/react-multistep-forms.svg)](https://www.npmjs.com/package/react-multistep-forms)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Flexible and customizable multistep form context for React with native React Hook Form integration.

> ⚠️ **Disclaimer: This package is currently under active development.**
>
> `react-multistep-forms` is not yet a stable release and may contain **bugs**, **incomplete features**, or **security vulnerabilities**.
>
> Any developer or end user who downloads or uses this package acknowledges that the package author is **not responsible** for any data loss, system failure, security issues, or other problems that may arise from its use.
>
> By downloading or using this package, the developer or end user agrees that the author of this package is not liable for any direct, indirect, incidental, or consequential damages arising from its use. Use at your own risk.
>
> It is strongly recommended to thoroughly test the package before using it in any production environment.
>
> For bug reports or suggestions, please open an issue on [GitHub Issues](https://github.com/bedirhan-kurt/react-multistep-forms/issues)."

![React Multistep Forms Introduction](https://s2.ezgif.com/tmp/ezgif-29c1a55a3697ac.gif)

## Installation

Install the package using npm:

```bash
npm install react-multistep-forms
```

Or using yarn:

```bash
yarn add react-multistep-forms
```

## Basic Usage

Here's a simple example of how to use the multi-step form:

```jsx
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  MultistepForm,
  MultistepFormProvider,
  StepContainer,
  Step,
  ProgressBar,
  StepControls,
  NextButton,
  PrevButton,
  SubmitButton
} from 'react-multistep-forms';

function MyForm() {
  const methods = useForm();
  
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };
  
  // Define which fields belong to which step
  const stepFieldsMap = {
    personalInfo: ['firstName', 'lastName'],
    contactInfo: ['email', 'phone'],
    addressInfo: ['address', 'city', 'zipCode']
  };
  
  return (
    <FormProvider {...methods}>
      <MultistepFormProvider 
        stepFieldsMap={stepFieldsMap} 
        onSubmit={handleSubmit}
      >
        <MultistepForm className="max-w-md mx-auto p-6 bg-white rounded shadow">
          <ProgressBar type="dot" className="mb-6" />
          
          <StepContainer>
            <Step title="Personal Information">
              <div className="space-y-4">
                <div>
                  <label>First Name</label>
                  <input {...methods.register('firstName', { required: true })} />
                  {methods.formState.errors.firstName && <span>This field is required</span>}
                </div>
                <div>
                  <label>Last Name</label>
                  <input {...methods.register('lastName', { required: true })} />
                  {methods.formState.errors.lastName && <span>This field is required</span>}
                </div>
              </div>
            </Step>
            
            <Step title="Contact Information">
              <div className="space-y-4">
                <div>
                  <label>Email</label>
                  <input {...methods.register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                  {methods.formState.errors.email && <span>Valid email is required</span>}
                </div>
                <div>
                  <label>Phone</label>
                  <input {...methods.register('phone')} />
                </div>
              </div>
            </Step>
            
            <Step title="Address Information">
              <div className="space-y-4">
                <div>
                  <label>Address</label>
                  <input {...methods.register('address', { required: true })} />
                  {methods.formState.errors.address && <span>This field is required</span>}
                </div>
                <div>
                  <label>City</label>
                  <input {...methods.register('city', { required: true })} />
                  {methods.formState.errors.city && <span>This field is required</span>}
                </div>
                <div>
                  <label>Zip Code</label>
                  <input {...methods.register('zipCode', { required: true })} />
                  {methods.formState.errors.zipCode && <span>This field is required</span>}
                </div>
              </div>
            </Step>
          </StepContainer>
          
          <StepControls className="flex justify-between mt-6">
            <PrevButton>Previous</PrevButton>
            <NextButton>Next</NextButton>
            <SubmitButton>Submit</SubmitButton>
          </StepControls>
        </MultistepForm>
      </MultistepFormProvider>
    </FormProvider>
  );
}
```

## Components API


### MultistepFormProvider

The context provider for the multi-step form.

| Prop | Type | Description |
|------|------|-------------|
| `stepFieldsMap` | `Record<string, string[]>` | Maps step keys to field names for validation |
| `onSubmit` | `() => void` | Function called when the form is submitted |
| `children` | `ReactNode` | Child components |


### MultistepForm

The main container for the multi-step form.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Child components |
| `className` | `string` | CSS class for styling |


### Step

Represents an individual step in the form.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Title of the step |
| `isValid` | `boolean` | Whether the step is valid |
| `children` | `ReactNode` | Content of the step |
| `className` | `string` | CSS class for styling |
| `hideTitle` | `boolean` | Whether to hide the title |


### StepContainer

Container that manages which step is currently visible.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Step components |
| `className` | `string` | CSS class for styling |


### ProgressBar

Visualizes progress through the form steps.

| Prop | Type | Description |
|------|------|-------------|
| `type` | `"dot" \| "bar" \| "dashed"` | Type of progress indicator |
| `className` | `string` | CSS class for styling |
| `fillColor` | `string` | Color for completed sections (default: "bg-blue-500") |
| `trackColor` | `string` | Color for incomplete sections (default: "bg-gray-300") |
| `height` | `string` | Height of the bar (default: "h-2") |
| `dotColor` | `string` | Color for completed dots (default: "bg-blue-500 border-blue-500") |
| `inactiveDotColor` | `string` | Color for incomplete dots (default: "bg-white border-gray-300") |
| `connectorColor` | `string` | Color for dot connectors (default: "bg-gray-300") |
| `dotSize` | `string` | Size of dots (default: "w-3 h-3") |
| `dashedGap` | `string` | Gap between dashed segments (default: "gap-1") |
| `dashedSegmentRadius` | `string` | Border radius of dashed segments (default: "rounded") |


### StepControls

Container for navigation buttons.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Button components |
| `className` | `string` | CSS class for styling |


### NextButton, PrevButton, SubmitButton

Navigation buttons for the form.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Button content |
| `className` | `string` | CSS class for styling |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Click handler |


### useMultistepForm

Hook to access the multi-step form context.

```jsx
const { 
  currentStepIndex,
  currentStepKey,
  stepFields,
  setStepFields,
  nextStep,
  prevStep,
  submit,
  steps
} = useMultistepForm();
```

| Return Value | Type | Description |
|--------------|------|-------------|
| `currentStepIndex` | `number` | Index of the current step |
| `currentStepKey` | `string` | Key of the current step |
| `stepFields` | `Record<string, string[]>` | Map of step keys to field names |
| `setStepFields` | `React.Dispatch<React.SetStateAction<Record<string, string[]>>>` | Function to update step fields |
| `nextStep` | `() => void` | Function to navigate to the next step |
| `prevStep` | `() => void` | Function to navigate to the previous step |
| `submit` | `() => void` | Function to submit the form |
| `steps` | `string[]` | Array of step keys |


## Progress Visualization

The `ProgressBar` component offers three different styles:

### Bar Type

```jsx
<ProgressBar type="bar" />
```

A continuous progress bar that fills based on the current step.

### Dot Type

```jsx
<ProgressBar type="dot" />
```

Dots connected by lines, with completed steps highlighted.

### Dashed Type

```jsx
<ProgressBar type="dashed" />
```

Segmented bar with each segment representing a step.


## Customization

All components accept a `className` prop for styling. You can use this to apply your own styles or integrate with CSS frameworks like Tailwind CSS.

For buttons, you can either provide a string as children (which will use default styling) or pass a custom button component:

```jsx
// Using default styling
<NextButton>Next</NextButton>

// Using custom button
<NextButton>
  <button className="my-custom-button">
    Next <ArrowRightIcon />
  </button>
</NextButton>
```


## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.