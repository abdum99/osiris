import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useState, useEffect } from "react";

import { PiPaintBrushFill, PiPottedPlantFill } from "react-icons/pi";

export const CmdK = () => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (navigator?.platform?.toLowerCase().includes("mac")
          ? e.metaKey
          : e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();
        e.stopPropagation();
  
        setIsOpen((currentValue) => {
          return !currentValue;
        });
      }
    }
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredItems = filterItems(
    [
      {
        heading: "Home",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "/",
          },
          {
            id: "settings",
            icon: "CogIcon",
            href: "/settings",
          },
          {
            id: "inky",
            children: "Inky",
            icon: <PiPaintBrushFill />,
            closeOnSelect: false,
            href: "/inky"
          },
          {
            id: "plants",
            children: "Plants",
            icon: <PiPottedPlantFill />,
            closeOnSelect: false,
            href: "/plants"
          },
          {
            id: "zt",
            href: "/zt"
          },
        ],
      },
      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "developer-settings",
            children: "Developer settings",
            icon: "CodeBracketIcon",
            href: "#",
          },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "#",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              alert("Logging out...");
            },
          },
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="projects">
        {/* Projects page */}
      </CommandPalette.Page>
    </CommandPalette>
  );
};