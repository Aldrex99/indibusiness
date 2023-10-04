import { useEffect, useState } from "react";

export default function LogoText() {
  const [theme, setTheme] = useState('dark')
  const [secondColor, setSecondColor] = useState('#3A3541DD')

  useEffect(() => {
    if (theme === 'dark') {
      setSecondColor('#D3D3D3FF')
    } else {
      setSecondColor('#3A3541DD')
    }
  }, [theme])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" zoomAndPan="magnify" viewBox="0 0 375 374.999991"
         preserveAspectRatio="xMidYMid meet" version="1.0"
    >
      <defs>
        <clipPath id="4287ba82c1">
          <path d="M 5.515625 68.769531 L 315 68.769531 L 315 306.519531 L 5.515625 306.519531 Z M 5.515625 68.769531 "
          />
        </clipPath>
        <clipPath id="9463832f77">
          <path d="M 345 145 L 369.265625 145 L 369.265625 169 L 345 169 Z M 345 145 "/>
        </clipPath>
        <clipPath id="27cff50e5f">
          <path d="M 144 174 L 332 174 L 332 306.519531 L 144 306.519531 Z M 144 174 "/>
        </clipPath>
      </defs>
      <g>
        <path fill="currentcolor"
              d="M 301.023438 111.988281 L 314.957031 111.988281 L 304.167969 89.71875 L 304.117188 89.617188 L 294.019531 68.769531 L 280.992188 86.335938 L 261.984375 111.988281 L 274.496094 111.988281 C 272.636719 125.15625 269.460938 138.066406 265.070312 150.511719 C 263.0625 156.214844 260.792969 161.820312 258.277344 167.308594 C 253.304688 178.152344 247.371094 188.546875 240.542969 198.328125 C 240.445312 198.660156 240.347656 198.992188 240.246094 199.320312 C 240.011719 199.453125 239.78125 199.59375 239.546875 199.730469 C 234.023438 207.492188 227.933594 214.859375 221.304688 221.757812 C 212.878906 230.527344 203.589844 238.53125 193.507812 245.613281 C 193.320312 245.75 193.125 245.882812 192.9375 246.011719 C 178.894531 255.804688 163.324219 263.808594 146.414062 269.609375 L 145 270.089844 C 125.523438 276.597656 104.296875 280.183594 81.597656 280.203125 C 81.542969 280.203125 81.484375 280.203125 81.429688 280.203125 C 71.785156 280.203125 62.78125 277.433594 55.171875 272.644531 C 41.234375 263.878906 31.96875 248.34375 31.96875 230.644531 C 31.96875 204.105469 52.804688 182.425781 78.980469 181.148438 C 79.789062 181.109375 80.609375 181.089844 81.429688 181.089844 C 90.25 181.089844 98.535156 183.402344 105.707031 187.460938 C 105.386719 184.765625 105.222656 182.019531 105.222656 179.234375 C 105.222656 172.414062 106.210938 165.824219 108.046875 159.601562 C 116.492188 130.996094 142.925781 110.117188 174.214844 110.117188 C 202.128906 110.117188 226.175781 126.738281 237.035156 150.636719 C 239.769531 156.652344 241.671875 163.132812 242.582031 169.925781 C 242.992188 172.96875 243.203125 176.078125 243.203125 179.234375 C 243.203125 179.410156 243.203125 179.589844 243.203125 179.765625 C 243.578125 179.113281 243.949219 178.453125 244.320312 177.796875 C 246.054688 174.691406 247.703125 171.542969 249.261719 168.351562 C 253.851562 158.945312 257.671875 149.171875 260.675781 139.144531 C 257.0625 131.332031 252.421875 124.097656 246.929688 117.597656 C 229.457031 96.933594 203.363281 83.808594 174.214844 83.808594 C 130.054688 83.808594 92.902344 113.9375 82.121094 154.785156 C 81.890625 154.785156 81.664062 154.78125 81.429688 154.78125 C 39.613281 154.78125 5.707031 188.753906 5.707031 230.644531 C 5.707031 263.285156 26.296875 291.117188 55.171875 301.816406 C 63.296875 304.828125 72.082031 306.484375 81.246094 306.503906 L 81.429688 306.503906 C 81.507812 306.503906 81.582031 306.503906 81.660156 306.503906 C 81.675781 306.503906 81.691406 306.503906 81.707031 306.503906 C 126.089844 306.453125 167.199219 293.789062 201.632812 271.65625 L 204.664062 269.671875 C 211.03125 265.429688 217.160156 260.859375 223.035156 255.980469 C 238.773438 242.898438 252.652344 227.605469 264.226562 210.5 C 267.589844 205.539062 270.753906 200.421875 273.71875 195.164062 C 278.039062 187.496094 281.925781 179.523438 285.347656 171.28125 C 292.574219 153.867188 297.726562 135.234375 300.492188 115.660156 L 301.011719 111.972656 Z M 82.195312 306.507812 C 83.085938 306.5 83.085938 306.5 82.195312 306.507812 Z M 81.699219 306.515625 L 81.664062 306.515625 Z M 81.699219 306.515625 "
        />
      </g>
      <path fill={secondColor}
            d="M 176.707031 247.273438 L 176.707031 168.253906 L 148.378906 168.253906 L 148.378906 260.730469 C 158.203125 257.074219 167.679688 252.574219 176.707031 247.273438 Z M 176.707031 247.273438 "
      />
      <path fill={secondColor}
            d="M 114.441406 195.703125 L 110.644531 195.703125 L 110.644531 270.378906 C 120.222656 268.964844 129.6875 266.828125 138.972656 263.941406 L 138.972656 195.699219 L 114.441406 195.699219 Z M 114.441406 195.703125 "
      />
      <path fill="currentcolor"
            d="M 214.441406 140.8125 L 186.109375 140.8125 L 186.109375 241.359375 C 186.929688 240.808594 187.738281 240.253906 188.546875 239.6875 L 189.09375 239.300781 C 198.179688 232.917969 206.664062 225.703125 214.4375 217.777344 L 214.4375 140.808594 Z M 214.441406 140.8125 "
      />
      <path fill="currentcolor"
            d="M 314.753906 167.84375 L 338.476562 167.84375 C 342.464844 167.84375 345.71875 171.109375 345.71875 175.105469 L 345.71875 198.867188 C 345.71875 202.863281 342.464844 206.132812 338.476562 206.132812 L 314.753906 206.132812 C 310.765625 206.132812 307.503906 202.863281 307.503906 198.867188 L 307.503906 175.105469 C 307.503906 171.109375 310.765625 167.84375 314.753906 167.84375 Z M 314.753906 167.84375 "
      />
      <g>
        <path fill={secondColor}
              d="M 350.371094 145.273438 L 364.683594 145.273438 C 367.09375 145.273438 369.0625 147.246094 369.0625 149.65625 L 369.0625 163.996094 C 369.0625 166.40625 367.09375 168.375 364.683594 168.375 L 350.371094 168.375 C 347.96875 168.375 345.996094 166.40625 345.996094 163.996094 L 345.996094 149.65625 C 345.996094 147.246094 347.964844 145.273438 350.371094 145.273438 Z M 350.371094 145.273438 "
        />
      </g>
      <path fill="currentcolor"
            d="M 332.542969 132.636719 L 340.519531 132.636719 C 341.863281 132.636719 342.953125 133.734375 342.953125 135.074219 L 342.953125 143.066406 C 342.953125 144.40625 341.863281 145.503906 340.519531 145.503906 L 332.542969 145.503906 C 331.207031 145.503906 330.109375 144.40625 330.109375 143.066406 L 330.109375 135.074219 C 330.109375 133.734375 331.207031 132.636719 332.542969 132.636719 Z M 332.542969 132.636719 "
      />
      <path fill="currentcolor"
            d="M 354.191406 130.105469 L 358.179688 130.105469 C 358.851562 130.105469 359.394531 130.65625 359.394531 131.324219 L 359.394531 135.320312 C 359.394531 135.992188 358.851562 136.539062 358.179688 136.539062 L 354.191406 136.539062 C 353.523438 136.539062 352.972656 135.988281 352.972656 135.320312 L 352.972656 131.324219 C 352.972656 130.652344 353.523438 130.105469 354.191406 130.105469 Z M 354.191406 130.105469 "
      />
      <g>
        <path fill={secondColor}
              d="M 292.136719 175.050781 Z M 291.972656 175.441406 Z M 289.738281 180.570312 Z M 288.300781 183.695312 Z M 283.914062 192.550781 Z M 283.71875 192.929688 Z M 261.875 280.210938 L 202.554688 280.210938 C 184.261719 291.53125 164.628906 300.054688 144.191406 305.738281 L 144.191406 306.519531 L 261.875 306.519531 C 300.265625 306.519531 331.394531 275.328125 331.394531 236.867188 C 331.394531 228.011719 329.746094 219.542969 326.734375 211.75 L 314.753906 211.75 C 307.683594 211.75 301.894531 205.949219 301.894531 198.863281 L 301.894531 179.910156 C 298.910156 177.804688 295.757812 175.925781 292.449219 174.300781 L 292.300781 174.65625 L 292.289062 174.683594 L 292.128906 175.0625 L 291.964844 175.449219 L 291.804688 175.824219 L 291.796875 175.84375 L 291.648438 176.203125 L 291.628906 176.246094 L 291.484375 176.585938 L 291.457031 176.644531 L 291.320312 176.964844 L 291.285156 177.035156 L 291.15625 177.339844 L 291.113281 177.429688 L 290.941406 177.820312 L 290.824219 178.089844 L 290.769531 178.21875 L 290.660156 178.46875 L 290.597656 178.613281 L 290.585938 178.636719 L 290.425781 179.003906 L 290.328125 179.222656 L 290.25 179.398438 L 290.160156 179.601562 L 290.074219 179.792969 L 290.054688 179.835938 L 289.71875 180.582031 L 289.652344 180.730469 L 289.542969 180.972656 L 289.367188 181.359375 L 289.3125 181.476562 L 289.1875 181.75 L 289.140625 181.851562 L 289.007812 182.140625 L 288.96875 182.222656 L 288.828125 182.53125 L 288.796875 182.59375 L 288.644531 182.917969 L 288.625 182.964844 L 288.464844 183.304688 L 288.453125 183.335938 L 288.277344 183.710938 L 288.101562 184.082031 L 287.921875 184.453125 L 287.914062 184.472656 L 287.746094 184.828125 L 287.730469 184.867188 L 287.570312 185.203125 L 287.546875 185.257812 L 287.394531 185.574219 L 287.359375 185.644531 L 287.214844 185.945312 L 287.171875 186.03125 L 286.984375 186.417969 L 286.851562 186.6875 L 286.792969 186.804688 L 286.671875 187.054688 L 286.609375 187.191406 L 286.492188 187.425781 L 286.417969 187.578125 L 286.308594 187.796875 L 286.222656 187.964844 L 286.035156 188.351562 L 285.941406 188.535156 L 285.839844 188.738281 L 285.757812 188.90625 L 285.648438 189.121094 L 285.574219 189.273438 L 285.457031 189.503906 L 285.386719 189.636719 L 285.070312 190.269531 L 284.875 190.652344 L 284.835938 190.734375 L 284.683594 191.035156 L 284.648438 191.101562 L 284.484375 191.417969 L 284.460938 191.46875 L 284.289062 191.800781 L 284.273438 191.832031 L 284.089844 192.179688 L 284.082031 192.199219 L 283.894531 192.566406 L 283.695312 192.945312 L 283.511719 193.292969 L 283.496094 193.320312 L 283.320312 193.65625 L 283.292969 193.699219 L 283.125 194.015625 L 283.09375 194.078125 L 282.933594 194.382812 L 282.890625 194.460938 L 282.738281 194.742188 L 282.6875 194.839844 L 282.546875 195.105469 L 282.488281 195.21875 L 282.355469 195.472656 L 282.285156 195.597656 L 282.160156 195.832031 L 282.082031 195.976562 L 281.464844 197.105469 L 281.371094 197.273438 L 281.253906 197.480469 L 281.167969 197.632812 L 281.042969 197.855469 L 280.96875 197.988281 C 295.273438 205.058594 305.117188 219.820312 305.117188 236.878906 C 305.117188 260.8125 285.746094 280.222656 261.855469 280.21875 Z M 261.875 280.210938 "
        />
      </g>
    </svg>
  )
}