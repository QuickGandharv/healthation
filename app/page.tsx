// import { Button } from "@/components/ui/button"

// export default function Page() {
//   return (
//     <div className="flex min-h-svh p-6">
//       <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
//         <div>
//           <h1 className="font-medium">Project ready!</h1>
//           <p>You may now add components and start building.</p>
//           <p>We&apos;ve already added the button component for you.</p>
//           <Button className="mt-2">Button</Button>
//         </div>
//         <div className="font-mono text-xs text-muted-foreground">
//           (Press <kbd>d</kbd> to toggle dark mode)
//         </div>
//       </div>
//     </div>
//   )
// }


export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black p-6">
      <div className="max-w-md w-full rounded-2xl shadow-lg border p-6 text-center">
        <h1 className="text-3xl font-bold mb-3">Telehealth App</h1>
        <p className="text-gray-600 mb-6">
          This is my first Next.js PWA single-page app.
        </p>

        <button className="px-5 py-3 rounded-xl bg-black text-white">
          Get Started
        </button>
      </div>
    </main>
  )
}