import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

const GitHubCalendar = lazy(() =>
  import("react-github-calendar").then((m) => ({ default: m.GitHubCalendar }))
);

const SKELETON_WEEKS = 52;
const SKELETON_DAYS = 7;
const BLOCK = 10;
const GAP = 3;

const SkeletonGrid: React.FC = () => (
  <Box
    aria-hidden
    sx={{
      display: "grid",
      gridTemplateColumns: `repeat(${SKELETON_WEEKS}, ${BLOCK}px)`,
      gridTemplateRows: `repeat(${SKELETON_DAYS}, ${BLOCK}px)`,
      gridAutoFlow: "column",
      gap: `${GAP}px`,
      width: "100%",
      overflow: "hidden"
    }}
  >
    {Array.from({ length: SKELETON_WEEKS * SKELETON_DAYS }).map((_, i) => (
      <Box
        key={i}
        sx={{
          width: BLOCK,
          height: BLOCK,
          borderRadius: "2px",
          background:
            i % 7 === 3 || i % 11 === 0
              ? "rgba(14, 173, 223, 0.25)"
              : "rgba(255, 255, 255, 0.04)"
        }}
      />
    ))}
  </Box>
);

const GitHubPreview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
        gap: 1,
        overflow: "hidden",
        "& .react-activity-calendar": { width: "100% !important" },
        "& .react-activity-calendar__scroll-container": { overflow: "hidden" },
        "& article > div": { gap: "3px !important" }
      }}
    >
      <Box sx={{ pointerEvents: "none", flex: 1, display: "flex", alignItems: "flex-end" }}>
        {shouldLoad ? (
          <Suspense fallback={<SkeletonGrid />}>
            <GitHubCalendar
              username="anhvuFE"
              colorScheme="dark"
              blockSize={10}
              blockMargin={3}
              blockRadius={2}
              fontSize={0}
              showColorLegend={false}
              showMonthLabels={false}
              showTotalCount={false}
              showWeekdayLabels={false}
              labels={{ totalCount: "" }}
              style={{ color: "transparent" }}
            />
          </Suspense>
        ) : (
          <SkeletonGrid />
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#8b949e" }}>
        <GitHub sx={{ fontSize: 14 }} />
        <Typography sx={{ fontSize: "0.75rem" }}>@anhvuFE — live contributions</Typography>
      </Box>
    </Box>
  );
};

export default GitHubPreview;
