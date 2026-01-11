const AslLogo = ({ size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* LEFT HAND */}
      <path
        d="M34 22
           C20 30, 18 52, 28 66
           L42 86
           C50 98, 64 94, 60 78
           L52 56
           C48 44, 56 38, 62 42"
        stroke="#1F2937"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* LEFT OK CIRCLE */}
      <path
        d="M56 52
           C48 48, 40 54, 44 62
           C48 70, 60 68, 60 58
           C60 54, 58 52, 56 52Z"
        stroke="#1F2937"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* RIGHT HAND */}
      <path
        d="M94 106
           C108 98, 110 76, 100 62
           L86 42
           C78 30, 64 34, 68 50
           L76 72
           C80 84, 72 90, 66 86"
        stroke="#1F2937"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* RIGHT OK CIRCLE */}
      <path
        d="M72 70
           C80 74, 88 68, 84 60
           C80 52, 68 54, 68 64
           C68 68, 70 70, 72 70Z"
        stroke="#1F2937"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AslLogo;
