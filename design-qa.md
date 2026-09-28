# Hero design QA

- Source visual truth: the supplied Dr. Manjinder Sandhu hero screenshot in the conversation.
- Implementation: `components/HomeHero.tsx` and `components/HomeHero.module.css`.
- Intended states: desktop hero, mobile hero, closed navigation, open treatment menu, open mobile navigation.
- Verification: `npm run lint`, `npm run build`, and `npm run typecheck` pass.
- Browser capture: blocked. The installed headless Chromium exits with a macOS `bootstrap_check_in` permission error before a page can be opened. No visual comparison is claimed from that failed capture.

## Findings

- The hero uses a serif display heading with italic blue emphasis, a blue gradient arch, a circular orbit detail, raised appointment buttons, a floating care note, a portrait caption, and responsive navigation.
- Hover, focus, active, dropdown, and mobile-menu states are implemented in CSS/React.

## Open questions

- The supplied portrait is the original public-site photograph and still includes its gray photographic background. A generated background-removal version changed the doctor’s identity and was not used.
- The current appointment and treatment links point to the existing canceronco.in pages until the new routes are built.

## Final result

final result: blocked
