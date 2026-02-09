# EquiForge Design System – Tokens

Colores y tipografía para usar en estilos y componentes.

## Archivos

- **`resources/css/equiforge.css`** – Variables CSS (`--ef-*`) para colores y tipografía.
- **`tailwind.config.js`** – Tema extendido con las mismas paletas para clases Tailwind.

## Uso con Tailwind

Puedes usar las clases de color de EquiForge como cualquier color de Tailwind:

```html
<!-- Fondos -->
<div class="bg-primary-500">...</div>
<div class="bg-secondary-600 text-white">...</div>
<div class="bg-success-100 text-black-500">...</div>
<div class="bg-danger-500 text-white">...</div>
<div class="bg-warning-500">...</div>
<div class="bg-info-500 text-white">...</div>

<!-- Texto -->
<p class="text-primary-700">...</p>
<p class="text-black-500">...</p>

<!-- Bordes -->
<div class="border border-primary-300">...</div>

<!-- Custom -->
<div class="bg-custom-neutral text-black-500">...</div>
<span class="text-custom-silver">...</span>
```

Escalas disponibles: `primary`, `secondary`, `success`, `warning`, `danger`, `info` (100–800), `black` (100–500), `custom` (silver, neutral).

## Uso con variables CSS

En CSS o en estilos en línea:

```css
.my-card {
  background: var(--ef-primary-500);
  color: var(--ef-text-inverse);
  font-family: var(--ef-font-family);
  font-size: var(--ef-text-xs);
  line-height: var(--ef-leading-xs);
}
```

## Tipografía (EquiForge tokens)

**Fuente:** Poppins (300, 400, 500, 600, 700), cargada en `app.blade.php`.

### Estilos por elemento

| Estilo  | Peso   | Tamaño | Line height | Letter spacing |
|---------|--------|--------|-------------|----------------|
| **h1**  | Light 300  | 48px | 54px | 0%     |
| **h2**  | Light 300  | 40px | 48px | 0.03em |
| **h3**  | Light 300  | 32px | 40px | 0.02em |
| **h4**  | Bold 700   | 32px | 40px | 0.02em |
| **h5**  | Bold 700   | 28px | 36px | 0.02em |
| **h6**  | Bold 700   | 24px | 30px | 0.03em |
| **p**   | Light 300  | 16px | 22px | 0.05em |
| **label** | Medium 500 | 14px | 18px | 0.05em |
| **small** | Light 300 | 12px | 16px | 0.05em |
| **xsmall** | Regular 400 | 10px | 14px | 0.05em |

### Uso con CSS (variables y clases)

Envolver contenido en `.ef-typography` para que `h1`–`h6`, `p`, `label` hereden los estilos, o usar clases de tipo:

```html
<div class="ef-typography">
  <h1>Título principal</h1>
  <p>Párrafo body.</p>
</div>

<!-- O por clase -->
<h2 class="ef-type-h2">...</h2>
<span class="ef-type-label">Label</span>
<small class="ef-type-small">Small</small>
<span class="ef-type-xsmall">XSmall</span>
```

Variables disponibles: `--ef-h1-size`, `--ef-h1-height`, `--ef-h1-weight`, `--ef-h1-spacing`, y análogas para h2–h6, p, label, small, xsmall.

### Uso con Tailwind

Combinar tamaño, peso y letter-spacing:

```html
<h1 class="text-ef-h1 font-ef-light tracking-normal text-black-500">H1</h1>
<h2 class="text-ef-h2 font-ef-light tracking-ef-normal">H2</h2>
<h4 class="text-ef-h4 font-ef-bold tracking-ef-tight">H4</h4>
<p class="text-ef-p font-ef-light tracking-ef-wide">Párrafo</p>
<label class="text-ef-label font-ef-medium tracking-ef-wide">Label</label>
<span class="text-ef-small font-ef-light tracking-ef-wide">Small</span>
<span class="text-ef-xsmall font-ef-regular tracking-ef-wide">XSmall</span>
```

- **Tamaños:** `text-ef-h1` … `text-ef-h6`, `text-ef-p`, `text-ef-label`, `text-ef-small`, `text-ef-xsmall`
- **Pesos:** `font-ef-light` (300), `font-ef-regular` (400), `font-ef-medium` (500), `font-ef-semibold` (600), `font-ef-bold` (700)
- **Letter-spacing:** `tracking-ef-tight` (0.02em), `tracking-ef-normal` (0.03em), `tracking-ef-wide` (0.05em)

## Componentes (Input & Action)

Componentes React en `resources/js/Components/EquiForge/` que siguen el diseño EquiForge.

### Botones (`EFButton`)

- **Variantes:** `solidPrimary` (morado oscuro), `solidPrimaryLight` (morado claro), `solidSecondary` (teal), `solidSecondaryLight` (teal claro), `outline` (borde morado), `outlineMuted` (borde gris, aspecto deshabilitado).
- **Tamaños:** `default` (texto + flechas ← →), `icon` (solo icono cuadrado).
- **Props:** `variant`, `size`, `showArrows`, `icon` (`'arrowUp'` | `'house'`), `disabled`, `children`.

```jsx
import { EFButton } from '@/Components/EquiForge';

<EFButton>Button</EFButton>
<EFButton variant="solidSecondary" />
<EFButton variant="outline" showArrows={false} />
<EFButton size="icon" icon="house" />
<EFButton variant="outlineMuted" disabled />
```

### Toggle / Switch (`EFToggle`)

- **Off:** pista gris, handle gris claro.
- **On:** pista primary (morado), handle primary oscuro.

```jsx
import { EFToggle } from '@/Components/EquiForge';

<EFToggle checked={on} onChange={setOn} />
```

### Checkbox (`EFCheckbox`)

- **Sin marcar:** recuadro con borde.
- **Marcado:** relleno primary y check blanco.

```jsx
import { EFCheckbox } from '@/Components/EquiForge';

<EFCheckbox checked={v} onChange={setV} label="Label" />
```

### Radio (`EFRadio`)

- **Sin marcar:** círculo con borde.
- **Marcado:** círculo primary con punto interior primary oscuro.

```jsx
import { EFRadio } from '@/Components/EquiForge';

<EFRadio name="g" value="a" checked={v === 'a'} onChange={setV} label="Label" />
```

Import desde barrel: `import { EFButton, EFToggle, EFCheckbox, EFRadio } from '@/Components/EquiForge';`

## Referencia rápida de colores (Base 500)

| Escala    | Base (500) | Uso típico      |
|----------|------------|------------------|
| Primary  | #815374    | Marca, acciones  |
| Secondary| #4D868E    | Secundario, fondos |
| Success  | #4EA685    | Éxito, confirmar |
| Warning  | #FFC627    | Avisos          |
| Danger   | #B82020    | Error, eliminar  |
| Info     | #0284C7    | Información     |
| Black    | #0A0203    | Texto principal |
