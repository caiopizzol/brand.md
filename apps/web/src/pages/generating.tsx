import { useEffect, useState } from "react";
import type { ModuleStatus } from "shared";
import { MODULE_LIST } from "shared";
import { useApp } from "../app";

export function Generating() {
  const { goTo } = useApp();
  const [moduleStates, setModuleStates] = useState<ModuleStatus[]>(
    MODULE_LIST.map(() => "pending"),
  );

  useEffect(() => {
    let cancelled = false;
    let current = 0;

    const advance = () => {
      if (cancelled) return;

      if (current >= MODULE_LIST.length) {
        // All done — go to output after a brief pause
        setTimeout(() => {
          if (!cancelled) goTo("output");
        }, 500);
        return;
      }

      // Set current module to active
      setModuleStates((prev) =>
        prev.map((s, i) =>
          i === current ? "active" : i < current ? "done" : "pending",
        ),
      );

      // After a delay, mark it done and advance
      setTimeout(
        () => {
          if (cancelled) return;
          setModuleStates((prev) =>
            prev.map((s, i) => (i <= current ? "done" : "pending")),
          );
          current++;
          setTimeout(advance, 200);
        },
        500 + Math.random() * 400,
      );
    };

    advance();

    return () => {
      cancelled = true;
    };
  }, [goTo]);

  return (
    <div className="generating">
      <div className="gen-container">
        <div className="gen-line" />
        <div className="gen-title">Building your .brand file</div>
        <div className="gen-sub">Combining research with your perspective.</div>
        <div className="gen-modules">
          {MODULE_LIST.map((mod, i) => (
            <div key={mod.id} className="gen-module">
              <div className={`gm-dot ${moduleStates[i]}`} />
              <div
                className={`gm-name${
                  moduleStates[i] === "active"
                    ? " active-text"
                    : moduleStates[i] === "pending"
                      ? " pending-text"
                      : ""
                }`}
              >
                {mod.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
