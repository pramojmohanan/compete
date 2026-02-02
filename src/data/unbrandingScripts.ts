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

}`,
  chatgpt: `function ExecuteScript() {

  const selectorGroups = [

    {
"name": "header",
"selectors": [{ "selector": "main div.sticky div.absolute", "multiple": false }],
"removeParent": true

    },

    {
"name": "Share Button",
"selectors": [

        { "selector": "button[title='Share message and prompt']", "multiple": true },

        { "selector": "button[title='Settings']", "multiple": false }

      ],
"removeParent": true

    },

    {
"name": "startChatButtons",
"selectors": [

        { "selector": "button[title='Open Sidebar']", "multiple": false },

        { "selector": "button[title='Start new chat']", "multiple": false },

        { "selector": "button[title='Open actions menu']", "multiple": false }

      ],
"removeParent": false

    },

    {
"name": "responseButtonsContainer",
"selectors": [{ "selector": ".flex.flex-col.items-end.gap-3.pb-8 button", "multiple": false }],
"removeParent": false

    },

    {
"name": "exampleQuestionButton",
"selectors": [

    {
"selector": "button[class*='text-start'][class*='text-sm'][class*='dark:border-white']",
"multiple": true

    }

  ],
"removeParent": false

},

{
"name": "scrollToTopButton",
"selectors": [

    {
"selector": "span.relative.rounded-full.bg-white\\\\/40",
"multiple": true

    }

  ],
"removeParent": true

  },

    {
"name": "searchBox",
"selectors": [{ "selector": "div[data-testid=composer]", "multiple": false }],
"removeParent": false

    },

    {
"name": "bgGradient",
"selectors": [{ "selector": "main div.absolute div.bg-gradient-chat-light", "multiple": false }],
"removeParent": false

    },

    {
"name": "todaySeparator",
"selectors": [{ "selector": "main div[data-testid=chat-page] div.items-center", "multiple": false }],
"removeParent": false

    },

    {
"name": "ratingsControls",
"selectors": [{ "selector": "main div.ease-in-out", "multiple": false }],
"removeParent": false

    },

    {
"name": "greyElements",
"selectors": [

        {
"selector": "div[data-content=user-message] div, button[aria-label*=Citation], a span.inline-block, table tr th, code.font-mono",
"multiple": true

        }

      ],
"removeParent": false,
"style": {
"backgroundColor": "#E9E9E9"

      }

    },

    {
"name": "backgroundElements",
"selectors": [

        { "selector": "div[data-testid=chat-page]", "multiple": false },

        { "selector": "div.sticky > div.absolute", "multiple": false }

      ],
"removeParent": false,
"style": {
"backgroundColor": "#fff"

      }

    },

    {
"name": "tableBorders",
"selectors": [

        { "selector": "table tr th", "multiple": true },

        { "selector": "table tr td", "multiple": true }

      ],
"removeParent": false,
"style": {
"borderColor": "#E0E0E0"

      }

    },

    {
"name": "showMoreButton",
"selectors": [

        { "selector": "button[title*='Show'][title*='more citations']", "multiple": false }

      ],
"removeParent": false

    },

    {
"name": "citationLinksModal",
"selectors": [{ "selector": "div[data-copy='false'] a", "multiple": true }],
"removeParent": false

    },

    {
"name": "aiMessageContainerParentPadding",
"selectors": [

        {
"selector": "div[data-tabster*='groupper'][data-content='ai-message']",
"multiple": false

        }

      ],
"removeParent": false,
"style": {
"parent": {
"padding": "0"

        }

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

        elements.forEach((el) => {

          if (hasStyle) {

            applyStyles(el);

          } else if (group.removeParent) {

            el.parentElement?.remove();

          } else {

            el.remove();

          }

        });

      } else {

        const el = document.querySelector(item.selector);

        if (!el) return;



        if (hasStyle) {

          applyStyles(el);

        } else if (group.removeParent) {

          el.parentElement?.remove();

        } else {

          el.remove();

        }

      }

    });

  });



  // Remove empty <div>s

  let removed;

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

  } while (removed);



  return "Cleanup complete";

}`,
  copilot: `function ExecuteScript() {

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
".avatar_primary",
".avatar_primary_model",
".avatar_primary_animation",
".mat-mdc-button-touch-target",
"[lottie-animation]"

    ];

    selectorsToRemove.forEach(selector => {

      document.querySelectorAll(selector).forEach(el => el.remove());

    });

    document.querySelectorAll(".user-query-bubble-with-background").forEach(el => {

      el.style.backgroundColor = "#E9E9E9";

    });

    document.querySelectorAll("button.button.ng-star-inserted").forEach(el => {

      el.style.backgroundColor = "#E9E9E9";

    });

    document.querySelectorAll('button[data-test-id="view-report-button"]').forEach(el => {

      el.style.backgroundColor = "#E9E9E9";

    });

    const promo = document.querySelector("contextual-discovery-response-promotion");

    if (promo) promo.remove();

  }

  setTimeout(removeDiv, 1000);

  const observer = new MutationObserver(() => removeDiv());

  observer.observe(document.body, { childList: true, subtree: true });

}`
};
