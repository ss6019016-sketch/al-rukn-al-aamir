# Tecnalogya (Angular 16 + Bootstrap 5)

Yeh project **alquwahcomputer.com** ki UI/UX ka clone hai — sirf frontend/styling,
**backend abhi pending hai**. Poora data dummy/static hai
(`src/app/core/services/product.service.ts` mein).

## Setup (local machine par)

```bash
npm install
npm start
```

App `http://localhost:4200` par khulega.

## Project Structure

```
src/app/
  core/
    models/product.model.ts        -> Product, Testimonial, CategoryBanner interfaces
    services/product.service.ts    -> DUMMY DATA yahan hai (backend ready hote hi
                                       yahan HttpClient calls laga dena, baaki
                                       app mein kuch change nahi karna)
  shared/
    product-card/                  -> reusable product card (grid mein har jagah use hota hai)
  components/
    header/          -> top bar + logo + search + nav
    hero-banner/      -> homepage slider
    deal-of-day/      -> "Deal Of The Day" grid
    limited-stock/    -> "Limited Stock" grid
    about-us/         -> about section
    wholesale-cta/     -> Want To Sell / Want To Buy forms (dummy submit)
    category-banner/  -> reusable banner+grid (Graphic/Business/Glossy series)
    best-sellers/     -> tabbed product grid
    new-arrivals/     -> new arrivals grid
    testimonials/     -> customer reviews
    footer/           -> footer + WhatsApp floating button
  app.component.*     -> sab sections ko homepage order mein assemble karta hai
  app.module.ts       -> sab components register
```

## Backend connect karte waqt (future)

1. `ProductService` ke andar static arrays hata ke `HttpClient` se API call karo.
2. Methods ke return type same rehne chahiye (`Product[]`, `Testimonial[]`, etc.)
   taake components mein kuch change na karna pare.
3. `wholesale-cta.component.ts` ke `submitSell()` / `submitBuy()` mein
   console.log ki jagah actual API POST call laga dena.

## Styling

- Bootstrap 5 (grid, forms, buttons) + Bootstrap Icons
- Custom theme `src/styles.css` mein CSS variables ke through (`--clr-primary`,
  `--clr-accent` waghera) — rang yahan se ek jagah change ho sakte hain.
- Har component ka apna scoped `.css` file hai (Angular default view encapsulation).
- Animations: fade-in-up on scroll sections, floating hero image, hover
  transforms on cards/banners, pulsing WhatsApp button.
