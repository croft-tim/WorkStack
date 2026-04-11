export default function PinkThemeBackground() {
  return (
    <div className="mt-12 flex w-full max-w-md items-center justify-center transition-all duration-700 animate-in fade-in zoom-in slide-in-from-bottom-8">
      <svg
        viewBox="0 0 400 600"
        className="h-auto w-full max-h-[400px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized Character Silhouette/Line Art */}
        {/* Hair */}
        <path
          d="M200 50C150 50 100 100 100 200C100 250 120 300 150 350C180 400 220 450 250 500"
          stroke="#db2777"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path
          d="M220 60C280 60 320 120 320 220C320 320 280 400 250 500"
          stroke="#db2777"
          strokeWidth="15"
          strokeLinecap="round"
        />
        
        {/* Face Profile */}
        <path
          d="M180 150C180 150 170 180 185 200C200 220 220 210 220 210"
          stroke="#db2777"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="195" cy="175" r="3" fill="#db2777" />
        
        {/* Body Outline */}
        <path
          d="M185 220C170 250 150 300 160 350C170 400 200 450 230 550"
          stroke="#db2777"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M220 220C240 250 260 300 250 350C240 400 230 450 240 550"
          stroke="#db2777"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Arms and Gloves */}
        <path
          d="M165 250C140 280 100 320 110 380"
          stroke="#9d174d"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M245 250C270 280 310 320 300 380"
          stroke="#9d174d"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Lightning Bolt in Left Hand */}
        <path
          d="M110 380L90 420L120 410L100 460"
          stroke="#f59e0b"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
        
        {/* Stylized Tool Belt / Overalls hint */}
        <path
          d="M160 350H250"
          stroke="#db2777"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <rect x="175" y="358" width="20" height="30" rx="4" fill="#db2777" />
        <rect x="215" y="358" width="20" height="30" rx="4" fill="#db2777" />
        
        {/* Electricity Sparks */}
        <path d="M120 440L130 450" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M80 430L70 440" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M100 480L95 495" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
