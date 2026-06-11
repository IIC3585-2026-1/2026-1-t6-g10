## Context

This project is a university assignment for an Advanced Web Development course.

The objective is to demonstrate the use of **native Web Components** using only browser standards:

- Custom Elements
- Shadow DOM
- HTML Templates

Frameworks and helper libraries are NOT allowed.

Examples of forbidden tools:

- Lit
- Stencil
- React
- Vue
- Angular
- Svelte
- Any third-party Web Components framework

Only vanilla JavaScript, HTML and CSS should be used.

---

## Project Theme

The application is inspired by the FIFA World Cup 2026 sticker album.

The page represents a platform where users can exchange duplicate stickers.

The goal is not to build a fully functional application but rather to demonstrate the required Web Components in a coherent theme.

---

## Required Components

The assignment requires implementing seven custom elements.

Each component should be placed in its own JavaScript file.

The project currently follows this structure:

```text
campo-numerico.js
mi-slider.js
mi-switch.js
mi-breadcrumb.js
mi-accordion.js
mi-card.js
mi-horizontal-scroll.js
index.html
```

---

## Design Philosophy

Not every component must demonstrate every Web Components feature.

A common mistake is to force Shadow DOM, Templates and Slots into every component.

Instead:

- Different components should demonstrate different concepts.
- The overall project should collectively demonstrate all required concepts.
- Simplicity is preferred over unnecessary abstraction.

---

# Component Specifications

## 1. campo-numerico

Purpose:

Select how many stickers the user wants to exchange.

Example:

```html
<campo-numerico value="5"> Stickers to exchange: </campo-numerico>
```

Concepts demonstrated:

- Custom Element
- Shadow DOM

Behavior:

- Numeric input
- "+" button
- "-" button
- Cannot go below zero

---

## 2. mi-slider

Purpose:

Maximum distance radius (km) for finding exchange partners.

Example:

```html
<mi-slider min="1" max="100" value="20" step="1"> </mi-slider>
```

Displayed meaning:

```text
Maximum exchange radius: 20 km
```

Concepts demonstrated:

- Custom Element
- Shadow DOM
- Custom attributes

Behavior:

- Range input
- Updates displayed distance

---

## 3. mi-switch

Purpose:

Toggle useful matches only.

Example:

```html
<mi-switch> Show only users with stickers I need </mi-switch>
```

Concepts demonstrated:

- Custom Element
- Shadow DOM
- Internal state

Behavior:

- ON/OFF toggle
- Changes visual state

---

## 4. mi-breadcrumb

Purpose:

Navigation.

Example:

```html
<mi-breadcrumb>
  <mi-breadcrumb-item href="#"> Home </mi-breadcrumb-item>

  <mi-breadcrumb-item href="#"> Exchanges </mi-breadcrumb-item>

  <mi-breadcrumb-item> Search </mi-breadcrumb-item>
</mi-breadcrumb>
```

Concepts demonstrated:

- Nested Custom Elements

Important:

This component intentionally does NOT need Shadow DOM.

Reason:

Breadcrumbs are simple navigation elements and can inherit page styling.

---

## 5. mi-accordion

Purpose:

Display stickers grouped by country.

Example:

```text
France
  FRA1
  FRA2
  FRA3
  ...
  FRA20
```

Concepts demonstrated:

- Parent Custom Element
- Child Custom Element
- Shadow DOM
- Slots

Example:

```html
<mi-accordion>
  <mi-accordion-item>
    <span slot="heading">France</span>

    FRA1, FRA2, FRA3...
  </mi-accordion-item>
</mi-accordion>
```

Behavior:

- Click heading
- Expand/collapse content

---

## 6. mi-card

Purpose:

Represent a single sticker.

Example:

```html
<mi-card> FRA7 </mi-card>
```

Concepts demonstrated:

- Custom Element
- Shadow DOM
- CSS Custom Properties

Example:

```css
.custom-card {
  --card-width: 150px;
  --card-height: 200px;
}
```

Behavior:

- Reusable sticker card
- Size configurable through CSS variables

---

## 7. mi-horizontal-scroll

Purpose:

Display multiple sticker cards in a horizontal list.

Example:

```html
<mi-horizontal-scroll>
  <mi-card>FRA7</mi-card>
  <mi-card>ARG10</mi-card>
  <mi-card>BRA3</mi-card>
</mi-horizontal-scroll>
```

Concepts demonstrated:

- Custom Element
- Shadow DOM
- Slot

Behavior:

- Horizontal scrolling container

---

# Required Concepts Coverage

The final project must visibly demonstrate:

## Custom Elements

All seven components.

## Shadow DOM

At minimum:

- campo-numerico
- mi-slider
- mi-switch
- mi-accordion-item
- mi-card
- mi-horizontal-scroll

## HTML Templates

At least one or more components should use:

```js
const template = document.createElement("template");
```

and clone the template content into Shadow DOM.

Templates do NOT need to be used everywhere.

## Slots

At least:

- mi-card
- mi-accordion-item
- mi-horizontal-scroll

---

# Styling

The visual theme should loosely resemble a FIFA World Cup sticker exchange site.

Suggested colors:

```css
#0033A0
#D71920
#FFFFFF
#F5F5F5
```

Avoid making the page look like seven unrelated demo widgets stacked vertically.

The page should feel like a single sticker exchange application.

---

# Main Goal

The priority is demonstrating understanding of native Web Components.

The project should favor:

- Simplicity
- Readability
- Clear use of standards

over:

- Complex architecture
- Overengineering
- Framework-like abstractions

```

```
