import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Services", to: "/", hash: "services" },
  { label: "About", to: "/", hash: "about" },
  { label: "How it works", to: "/", hash: "how-it-works" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="h-1 bg-primary" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-h-11 items-center gap-2.5 rounded-md pr-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <img
            src="https://i.postimg.cc/kGB9snXJ/1001571267.jpg"
            alt="Hope Tree Logo"
            width={40}
            height={40}
            className="size-10 rounded-full object-cover img-frame"
          />
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-semibold tracking-tight text-foreground">
              {SITE.name}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Guidance & Counseling
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-foreground/80 outline-none transition-[background-color,color] duration-150 ease-out hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="ml-2">
            <Link to="/book">Book a session</Link>
          </Button>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/25" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-background p-5 shadow-xl outline-none">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-lg font-semibold">
                  Menu
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X />
                  </Button>
                </Dialog.Close>
              </div>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item) => (
                  <Dialog.Close key={item.label} asChild>
                    <Link
                      to={item.to}
                      hash={item.hash}
                      className="flex h-12 items-center rounded-lg px-3 text-base font-medium text-foreground hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>
                ))}
                <Dialog.Close asChild>
                  <Button asChild className="mt-4 w-full" size="lg">
                    <Link to="/book">Book a session</Link>
                  </Button>
                </Dialog.Close>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
