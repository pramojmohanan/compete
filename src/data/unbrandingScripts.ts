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

  // Keep only chat thread content - remove EVERYTHING else
  
  // Remove entire sidebar
  const sidebar = document.querySelector("#stage-slideover-sidebar");
  if (sidebar) sidebar.remove();
  
  // Remove sidebar rail
  const rail = document.querySelector("#stage-sidebar-tiny-bar");
  if (rail) rail.remove();
  
  // Remove header
  const header = document.querySelector("header");
  if (header) header.remove();
  
  // Remove all buttons and action containers (except those in messages)
  document.querySelectorAll("button[data-testid*='turn-action']").forEach(el => el.remove());
  document.querySelectorAll("button[aria-label='Share']").forEach(el => el.remove());
  document.querySelectorAll("button[aria-label='More actions']").forEach(el => el.remove());
  document.querySelectorAll("button[data-testid='composer-plus-btn']").forEach(el => el.remove());
  document.querySelectorAll("button[aria-label='Dictate button']").forEach(el => el.remove());
  document.querySelectorAll("button[class*='scroll-to']").forEach(el => el.remove());
  
  // Remove scroll to bottom button container
  document.querySelectorAll("div.sticky.bottom-0.group\\\\/thread-bottom-container").forEach(el => {
    const scrollBtn = el.querySelector("button");
    if (scrollBtn) scrollBtn.remove();
  });
  
  // Remove disclaimer
  document.querySelectorAll("div[class*='Cookie']").forEach(el => el.remove());
  document.querySelectorAll("div.-mt-4.text-token-text-secondary").forEach(el => el.remove());
  
  // Remove all nav elements
  document.querySelectorAll("nav").forEach(el => el.remove());
  document.querySelectorAll("aside").forEach(el => el.remove());
  
  // Remove message action containers (the flex containers with ratings)
  document.querySelectorAll("div.z-0.flex.min-h-\\\\[46px\\\\]").forEach(el => el.remove());
  document.querySelectorAll("div[class*='z-0'][class*='justify-start']").forEach(el => {
    if (el.querySelectorAll("button[data-testid*='action']").length > 0) {
      el.remove();
    }
  });
  
  // Keep chat thread - this is the main content
  const threadContainer = document.querySelector("div[id='thread-bottom']");
  if (threadContainer) {
    threadContainer.style.maxWidth = "100%";
    threadContainer.style.margin = "0";
  }
  
  // Remove composer footer area but keep messages
  document.querySelectorAll("div#thread-bottom-container").forEach(el => {
    const composer = el.querySelector("form");
    if (composer) composer.remove();
  });
  
  // Clean up empty divs
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
      if (isEmpty && !div.id && !div.className.includes("thread")) {
        div.remove();
        removed = true;
      }
    });
    iterations++;
    if (iterations > 100) break;
  } while (removed);
  
  console.log("Chat view cleaned - keeping only response divs");
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
"name": "Scroll to Bottom Button",
"selectors": [

        { "selector": "button[data-testid='scroll-to-bottom-button']", "multiple": true },

        { "selector": "div.pointer-events-none.absolute.flex.justify-center", "multiple": true },

        { "selector": "button[title='Scroll to bottom']", "multiple": true }

      ],
"removeParent": true

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
