import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { ArrowUpward as ArrowUpIcon } from "@mui/icons-material";
import { useReducedMotion } from "motion/react";
import MatrixRain from "../sakura/MatrixRain";
import { keyframes } from "@emotion/react";

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const MONO = '"Fira Code", "JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace';

// Computed once at load rather than on every Footer render (copyright line).
const currentYear: number = new Date().getFullYear();

interface Line {
  prompt?: boolean;
  command?: string;
  output?: React.ReactNode;
}

const linkSx = {
  color: "#0eaddf",
  textDecoration: "underline",
  textDecorationColor: "rgba(14, 173, 223, 0.3)",
  textUnderlineOffset: 3,
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#3dc4ee",
    textDecorationColor: "#3dc4ee"
  }
};

const dotSx = (color: string) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: color,
  flexShrink: 0
});

const initialLines: Line[] = [
  { prompt: true, command: "whoami" },
  { output: <Box component="span" sx={{ color: "#e6edf3" }}>Vũ Xuân Anh — Full Stack Developer</Box> },
  { prompt: true, command: "cat /status" },
  {
    output: (
      <Box component="span" sx={{ color: "#22c55e", display: "inline-flex", alignItems: "center", gap: 1 }}>
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 6px rgba(34, 197, 94, 0.8)"
          }}
        />
        available for new opportunities
      </Box>
    )
  },
  { prompt: true, command: "help" },
  {
    output: (
      <Box component="span" sx={{ color: "#8b949e" }}>
        try: <Box component="span" sx={{ color: "#0eaddf" }}>about</Box>{" · "}
        <Box component="span" sx={{ color: "#0eaddf" }}>skills</Box>{" · "}
        <Box component="span" sx={{ color: "#0eaddf" }}>projects</Box>{" · "}
        <Box component="span" sx={{ color: "#0eaddf" }}>contact</Box>{" · "}
        <Box component="span" sx={{ color: "#0eaddf" }}>clear</Box>
      </Box>
    )
  }
];

interface CommandResult {
  output?: React.ReactNode;
  clear?: boolean;
}

function runCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: null };
  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
      return {
        output: (
          <Box component="span" sx={{ color: "#8b949e" }}>
            available: <Box component="span" sx={{ color: "#0eaddf" }}>about</Box>,{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>skills</Box>,{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>projects</Box>,{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>contact</Box>,{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>whoami</Box>,{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>echo &lt;text&gt;</Box>,{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>clear</Box>
          </Box>
        )
      };
    case "whoami":
      return { output: <Box component="span" sx={{ color: "#e6edf3" }}>Vũ Xuân Anh — Full Stack Developer</Box> };
    case "about":
    case "cat":
      if (cmd.toLowerCase() === "cat" && arg.toLowerCase() !== "about" && arg.toLowerCase() !== "skills") {
        return { output: <Box component="span" sx={{ color: "#f5576c" }}>cat: {arg || "missing operand"}: No such file</Box> };
      }
      if (cmd.toLowerCase() === "cat" && arg.toLowerCase() === "skills") {
        return {
          output: (
            <Box component="span" sx={{ color: "#e6edf3" }}>
              react, typescript, node, next.js, mui, postgres, mongo, docker, aws
            </Box>
          )
        };
      }
      return {
        output: (
          <Box component="span" sx={{ color: "#e6edf3" }}>
            full-stack dev, ~3 yrs across 4 companies. frontend-leaning. currently @ neliSoftwares.
          </Box>
        )
      };
    case "skills":
      return {
        output: (
          <Box component="span" sx={{ color: "#e6edf3" }}>
            react, typescript, node, next.js, mui, postgres, mongo, docker, aws
          </Box>
        )
      };
    case "projects":
    case "ls":
      return {
        output: (
          <Box component="span" sx={{ color: "#8b949e" }}>
            scroll up and tap the{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>Projects</Box> bento card for case studies
          </Box>
        )
      };
    case "contact":
      return {
        output: (
          <Box component="span">
            <Box component="a" href="https://github.com/anhvuFE" target="_blank" rel="noopener noreferrer" sx={linkSx}>github.com/anhvuFE</Box>
            {"  "}
            <Box component="a" href="https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/" target="_blank" rel="noopener noreferrer" sx={linkSx}>linkedin</Box>
            {"  "}
            <Box component="a" href="mailto:vuxuananh22@gmail.com" sx={linkSx}>vuxuananh22@gmail.com</Box>
          </Box>
        )
      };
    case "echo":
      return { output: <Box component="span" sx={{ color: "#e6edf3" }}>{arg}</Box> };
    case "clear":
      return { clear: true };
    case "sudo":
      return { output: <Box component="span" sx={{ color: "#f5576c" }}>nice try.</Box> };
    case "rm":
      return { output: <Box component="span" sx={{ color: "#f5576c" }}>permission denied.</Box> };
    default:
      return {
        output: (
          <Box component="span" sx={{ color: "#f5576c" }}>
            command not found: {cmd} — try{" "}
            <Box component="span" sx={{ color: "#0eaddf" }}>help</Box>
          </Box>
        )
      };
  }
}

const Footer: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  // Intro types the opening lines out; the input is only shown once done.
  // Reduced motion skips straight to the full, interactive terminal.
  const [history, setHistory] = useState<Line[]>(
    prefersReducedMotion ? initialLines : []
  );
  const [typing, setTyping] = useState<string | null>(null);
  const [introDone, setIntroDone] = useState<boolean>(!!prefersReducedMotion);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const introStartedRef = useRef(false);

  const commandHistory = useMemo(
    () => history.filter((l) => l.prompt && l.command).map((l) => l.command as string),
    [history]
  );

  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, typing]);

  // Replay the opening lines as a typed-out terminal session once the footer
  // scrolls into view. Command lines type char-by-char; outputs appear after.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = terminalRef.current;
    if (!el) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const runIntro = async () => {
      for (const line of initialLines) {
        if (cancelled) return;
        if (line.prompt && line.command) {
          const cmd = line.command;
          for (let i = 1; i <= cmd.length; i++) {
            if (cancelled) return;
            setTyping(cmd.slice(0, i));
            await sleep(45);
          }
          await sleep(300);
          if (cancelled) return;
          setTyping(null);
          setHistory((prev) => [...prev, line]);
          await sleep(200);
        } else {
          setHistory((prev) => [...prev, line]);
          await sleep(260);
        }
      }
      if (!cancelled) setIntroDone(true);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !introStartedRef.current) {
            introStartedRef.current = true;
            runIntro();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  const submit = useCallback(() => {
    const value = input;
    const result = runCommand(value);
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        { prompt: true, command: value },
        ...(result.output !== null && result.output !== undefined ? [{ output: result.output }] : [])
      ]);
    }
    setInput("");
    setHistoryIndex(null);
  }, [input]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const next = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(next);
        setInput(commandHistory[next] ?? "");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === null) return;
        const next = historyIndex + 1;
        if (next >= commandHistory.length) {
          setHistoryIndex(null);
          setInput("");
        } else {
          setHistoryIndex(next);
          setInput(commandHistory[next] ?? "");
        }
      }
    },
    [submit, commandHistory, historyIndex]
  );

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(14, 173, 223, 0.08)",
        overflow: "hidden",
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 5 }
      }}
    >
      <MatrixRain />

      <IconButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 30 },
          right: { xs: 20, md: 30 },
          background: "#0eaddf",
          color: "#0a0a0a",
          width: 48,
          height: 48,
          boxShadow: "0 8px 24px rgba(14, 173, 223, 0.4)",
          animation: `${float} 3s ease-in-out infinite`,
          zIndex: 1000,
          "&:hover": { background: "#3dc4ee", transform: "scale(1.08)" }
        }}
      >
        <ArrowUpIcon />
      </IconButton>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          ref={terminalRef}
          onClick={focusInput}
          sx={{
            background: "#0d1117",
            borderRadius: 2.5,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(14, 173, 223, 0.05)",
            overflow: "hidden",
            fontFamily: MONO,
            cursor: "text"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.25,
              background: "rgba(255, 255, 255, 0.02)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <Box sx={{ display: "flex", gap: 0.75 }}>
              <Box sx={dotSx("#ff5f56")} />
              <Box sx={dotSx("#ffbd2e")} />
              <Box sx={dotSx("#27c93f")} />
            </Box>
            <Typography
              sx={{
                flex: 1,
                textAlign: "center",
                color: "#6e7681",
                fontSize: "0.75rem",
                fontFamily: MONO,
                letterSpacing: 0.3,
                userSelect: "none"
              }}
            >
              vuxuananh@portfolio: ~ — interactive
            </Typography>
            <Box sx={{ width: 52 }} />
          </Box>

          <Box
            ref={bodyRef}
            sx={{
              p: { xs: 2, md: 3 },
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              lineHeight: 1.7,
              fontFamily: MONO,
              color: "#8b949e",
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: { xs: 320, md: 380 }
            }}
          >
            {history.map((line, i) => (
              <Box key={i} sx={{ minHeight: "1.7em", whiteSpace: "nowrap" }}>
                {line.prompt && (
                  <>
                    <Box component="span" sx={{ color: "#22c55e" }}>vu@portfolio</Box>
                    <Box component="span" sx={{ color: "#6e7681" }}>:</Box>
                    <Box component="span" sx={{ color: "#0eaddf" }}>~</Box>
                    <Box component="span" sx={{ color: "#6e7681" }}>$ </Box>
                    <Box component="span" sx={{ color: "#e6edf3" }}>{line.command}</Box>
                  </>
                )}
                {line.output && <Box>{line.output}</Box>}
                {!line.prompt && !line.output && <>&nbsp;</>}
              </Box>
            ))}

            {typing !== null && (
              <Box sx={{ minHeight: "1.7em", whiteSpace: "nowrap" }}>
                <Box component="span" sx={{ color: "#22c55e" }}>vu@portfolio</Box>
                <Box component="span" sx={{ color: "#6e7681" }}>:</Box>
                <Box component="span" sx={{ color: "#0eaddf" }}>~</Box>
                <Box component="span" sx={{ color: "#6e7681" }}>$ </Box>
                <Box component="span" sx={{ color: "#e6edf3" }}>{typing}</Box>
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    display: "inline-block",
                    width: "0.55em",
                    height: "1em",
                    background: "#0eaddf",
                    verticalAlign: "text-bottom",
                    ml: "1px",
                    animation: `${blink} 1s step-end infinite`
                  }}
                />
              </Box>
            )}

            {introDone && (
            <Box sx={{ minHeight: "1.7em", display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ color: "#22c55e" }}>vu@portfolio</Box>
              <Box component="span" sx={{ color: "#6e7681" }}>:</Box>
              <Box component="span" sx={{ color: "#0eaddf" }}>~</Box>
              <Box component="span" sx={{ color: "#6e7681" }}>$&nbsp;</Box>
              <Box
                component="input"
                ref={inputRef}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="terminal input"
                sx={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e6edf3",
                  fontFamily: MONO,
                  fontSize: "inherit",
                  caretColor: "#0eaddf",
                  padding: 0,
                  minWidth: 0
                }}
              />
              {input.length === 0 && (
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    display: "inline-block",
                    width: "0.55em",
                    height: "1em",
                    background: "#0eaddf",
                    animation: `${blink} 1s step-end infinite`,
                    verticalAlign: "text-bottom",
                    marginLeft: "-0.5em",
                    pointerEvents: "none"
                  }}
                />
              )}
            </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            color: "#6e7681",
            fontFamily: MONO,
            fontSize: "0.7rem"
          }}
        >
          <Box component="span">{`// © ${currentYear} Vũ Xuân Anh`}</Box>
          <Box component="span">{"// type 'help' in the terminal above"}</Box>
        </Box>
      </Container>
    </Box>
  );
};

// Memoized: prop-less, so it skips re-rendering when App re-renders (e.g. the
// command palette), keeping the terminal state and MatrixRain untouched.
export default React.memo(Footer);
