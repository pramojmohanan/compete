export const unbrandingScripts: Record<string, string> = {
  gemini: `function ExecuteScript() {

  function removeDiv() {

    const selectorsToRemove = [
"bard-sidenav",
".desktop-ogb-buffer",
".side-nav-menu-button.with-pill-ui",
'[data-test-id="bard-mode-switcher"]',
'[aria-label^="Google Account:"]',
'[data-test-id="pillbox"]',
'[data-test-id="overflow-container"]',
"input-container",
".response-container-footer",
".avatar-component",
'[data-test-id="thoughts-header-button"]',
".response-footer",
".response-container-header",
".avatar_primary",                   // avatar wrapper
".avatar_primary_model",             // inner avatar
".avatar_primary_animation",         // animated avatar SVG
".mat-mdc-button-touch-target",      // extra button wrapper
"[lottie-animation]"                 // lottie directive

    ];

    selectorsToRemove.forEach(selector => {

      document.querySelectorAll(selector).forEach(el => el.remove());

    });

    // Optional UI adjustments

    document.querySelectorAll(".user-query-bubble-with-background").forEach(el => {

      el.style.backgroundColor = "#E9E9E9";

    });

/*

    document.querySelectorAll("*").forEach(el => {

      el.style.color = "#555";

    });*/

    document.querySelectorAll("button.button.ng-star-inserted").forEach(el => {

      el.style.backgroundColor = "#E9E9E9";

    });

    document.querySelectorAll('button[data-test-id="view-report-button"]').forEach(el => {

      el.style.backgroundColor = "#E9E9E9";

    });

    const promo = document.querySelector("contextual-discovery-response-promotion");

    if (promo) promo.remove();

  }

  // Run once after a short delay (for initial load)

  setTimeout(removeDiv, 1000);

  // Keep watching for any future DOM changes

  const observer = new MutationObserver(() => removeDiv());

  observer.observe(document.body, { childList: true, subtree: true });

}

// Execute the script
ExecuteScript();`,
  chatgpt: `function ExecuteScript() {

  const selectorGroups = [

    {
"name": "Sidebar Container",
"selectors": [

        { "selector": "#stage-slideover-sidebar", "multiple": false },

        { "selector": "div[id*='stage-sidebar']", "multiple": true },

        { "selector": "div.border-token-border-light.relative.z-21", "multiple": false }

      ],
"removeParent": true

    },

    {
"name": "Sidebar Rail/Tiny Bar",
"selectors": [

        { "selector": "#stage-sidebar-tiny-bar", "multiple": false },

        { "selector": "div[class*='tiny-bar']", "multiple": false }

      ],
"removeParent": true

    },

    {
"name": "Message Actions Container",
"selectors": [

        { "selector": "div[class*='z-0'][class*='flex'][class*='min-h'][class*='justify-start']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Good/Bad Response Buttons",
"selectors": [

        { "selector": "button[data-testid='good-response-turn-action-button']", "multiple": true },

        { "selector": "button[data-testid='bad-response-turn-action-button']", "multiple": true },

        { "selector": "button[aria-label='Good response']", "multiple": true },

        { "selector": "button[aria-label='Bad response']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Message Share Button",
"selectors": [

        { "selector": "button[aria-label='Share']", "multiple": true },

        { "selector": "button[data-state='closed'][aria-label='Share']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "More Actions Button",
"selectors": [

        { "selector": "button[aria-label='More actions']", "multiple": true },

        { "selector": "button[type='button'][aria-label='More actions']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Chat History Section",
"selectors": [

        { "selector": "div#history", "multiple": false }

      ],
"removeParent": true

    },

    {
"name": "Create New Chat Button",
"selectors": [

        { "selector": "button[data-testid='create-new-chat-button']", "multiple": true },

        { "selector": "a[data-testid='create-new-chat-button']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Search Chats",
"selectors": [

        { "selector": "input[placeholder*='Search']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Library/Images Button",
"selectors": [

        { "selector": "a[data-testid='sidebar-item-library']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "GPTs Section",
"selectors": [

        { "selector": "div[class*='sidebar-expando-section']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Apps Button",
"selectors": [

        { "selector": "a[data-testid='apps-button']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Projects Button",
"selectors": [

        { "selector": "a[href='/projects']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Explore GPTs Button",
"selectors": [

        { "selector": "a[data-testid='explore-gpts-button']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Profile Button",
"selectors": [

        { "selector": "button[data-testid='accounts-profile-button']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Scroll to Bottom Button",
"selectors": [

        { "selector": "button[class*='scroll-to']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "History Item Options",
"selectors": [

        { "selector": "button[data-testid*='history-item-options']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Composer Plus Button",
"selectors": [

        { "selector": "button[data-testid='composer-plus-btn']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Voice/Dictate Buttons",
"selectors": [

        { "selector": "button[aria-label='Dictate button']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Disclaimer",
"selectors": [

        { "selector": "div[class*='Cookie Preferences']", "multiple": true }

      ],
"removeParent": true

    },

    {
"name": "Background Styling",
"selectors": [

        { "selector": "body", "multiple": false }

      ],
"removeParent": false,
"style": {

        "backgroundColor": "#ffffff"

      }

    }

  ];

  // Core logic to apply styles or remove elements

  selectorGroups.forEach((group) => {

    group.selectors.forEach((item) => {

      if (!item) return;

      const hasStyle = !!group.style;

      const applyStyles = (el) => {

        if (hasStyle) {

          const { parent, ...ownStyles } = group.style;

          Object.entries(ownStyles).forEach(([key, value]) => {

            el.style[key] = value;

          });

          if (parent && el.parentElement) {

            Object.entries(parent).forEach(([key, value]) => {

              el.parentElement.style[key] = value;

            });

          }

        }

      };

      if (item.multiple) {

        const elements = document.querySelectorAll(item.selector);

        console.log(\`Found \${elements.length} elements for: \${item.selector}\`);

        elements.forEach((el) => {

          if (hasStyle) {

            applyStyles(el);

          } else if (group.removeParent && el.parentElement) {

            el.parentElement.remove();

          } else {

            el.remove();

          }

        });

      } else {

        const el = document.querySelector(item.selector);

        if (!el) {

          console.log(\`No element found for: \${item.selector}\`);

          return;

        }

        if (hasStyle) {

          applyStyles(el);

        } else if (group.removeParent && el.parentElement) {

          el.parentElement.remove();

        } else {

          el.remove();

        }

      }

    });

  });

  // Remove empty <div>s

  let removed;

  let iterations = 0;

  do {

    removed = false;

    const allDivs = document.querySelectorAll("div");

    allDivs.forEach((div) => {

      const isEmpty = [...div.childNodes].every((node) => {

        return (

          (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === "") ||

          node.nodeType === Node.COMMENT_NODE

        );

      });

      if (isEmpty) {

        div.remove();

        removed = true;

      }

    });

    iterations++;

    if (iterations > 100) break; // Safety limit

  } while (removed);

  console.log("Cleanup complete");

  return "Cleanup complete";

}

// Execute the script
ExecuteScript();`,
  copilot: `function ExecuteScript() {

  const selectorGroups = [

    {
"name": "header",
"selectors": [{ "selector": ".pointer-events-none.sticky", "multiple": false }],
"removeParent": false

    },

    {
"name": "Share Buttons",
"selectors": [

        { "selector": "button[title='Share message and prompt']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Message Reactions",
"selectors": [

        { "selector": "[data-testid='message-item-reactions']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Date Divider",
"selectors": [

        { "selector": "[data-testid='date-divider']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Citation Cards",
"selectors": [

        { "selector": "[data-testid='citation-cards-row']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Composer Container",
"selectors": [

        { "selector": ".relative.max-h-full.w-expanded-composer", "multiple": false }

      ],
"removeParent": false

    },

    {
"name": "Scroll to Top Button",
"selectors": [

        { "selector": ".relative.flex.items-center.gap-x-1\\\\.5", "multiple": true },

        { "selector": "span.relative.rounded-full.bg-white\\\\/40", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Open Sidebar Button",
"selectors": [

        { "selector": "button[aria-label='Open sidebar']", "multiple": true }

      ],
"removeParent": false

    },

    {
"name": "Sidebar Container",
"selectors": [

        { "selector": ".w-sidebar", "multiple": false },

        { "selector": "[data-testid='sidebar-settings-button']", "multiple": false }

      ],
"removeParent": true

    },

    {
"name": "Sidebar Navigation",
"selectors": [

        { "selector": "[data-testid='sidebar-container']", "multiple": false },

        { "selector": "[data-testid='sidebar-copilot-brand-button']", "multiple": false },

        { "selector": "[data-testid='sidebar-new-conversation-button']", "multiple": false }

      ],
"removeParent": true

    },

    {
"name": "Sidebar Width Container",
"selectors": [

        { "selector": "div.absolute.h-full.w-0[style*='width: 52px']", "multiple": false },

        { "selector": "div.md\\\\:w-\\\\[52px\\\\]", "multiple": false }

      ],
"removeParent": false

    },

    {
"name": "User Messages Background",
"selectors": [

        { "selector": "[data-content='user-message']", "multiple": true }

      ],
"removeParent": false,
"style": {

        "backgroundColor": "#f0f0f0"

      }

    },

    {
"name": "Main Background",
"selectors": [

        { "selector": "[data-testid='chat-page']", "multiple": false }

      ],
"removeParent": false,
"style": {

        "backgroundColor": "#ffffff"

      }

    },

    {
"name": "Body Background",
"selectors": [

        { "selector": "body", "multiple": false }

      ],
"removeParent": false,
"style": {

        "backgroundColor": "#ffffff"

      }

    }

  ];

  // Core logic to apply styles or remove elements

  selectorGroups.forEach((group) => {

    group.selectors.forEach((item) => {

      if (!item) return;

      const hasStyle = !!group.style;

      const applyStyles = (el) => {

        if (hasStyle) {

          const { parent, ...ownStyles } = group.style;

          Object.entries(ownStyles).forEach(([key, value]) => {

            el.style[key] = value;

          });

          if (parent && el.parentElement) {

            Object.entries(parent).forEach(([key, value]) => {

              el.parentElement.style[key] = value;

            });

          }

        }

      };

      if (item.multiple) {

        const elements = document.querySelectorAll(item.selector);

        console.log(\`Found \${elements.length} elements for: \${item.selector}\`);

        elements.forEach((el) => {

          if (hasStyle) {

            applyStyles(el);

          } else if (group.removeParent && el.parentElement) {

            el.parentElement.remove();

          } else {

            el.remove();

          }

        });

      } else {

        const el = document.querySelector(item.selector);

        if (!el) {

          console.log(\`No element found for: \${item.selector}\`);

          return;

        }

        if (hasStyle) {

          applyStyles(el);

        } else if (group.removeParent && el.parentElement) {

          el.parentElement.remove();

        } else {

          el.remove();

        }

      }

    });

  });

  // Remove empty <div>s

  let removed;

  let iterations = 0;

  do {

    removed = false;

    const allDivs = document.querySelectorAll("div");

    allDivs.forEach((div) => {

      const isEmpty = [...div.childNodes].every((node) => {

        return (

          (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === "") ||

          node.nodeType === Node.COMMENT_NODE

        );

      });

      if (isEmpty) {

        div.remove();

        removed = true;

      }

    });

    iterations++;

    if (iterations > 100) break; // Safety limit

  } while (removed);

  console.log("Cleanup complete");

  return "Cleanup complete";

}

// Execute the script
ExecuteScript();`
};
