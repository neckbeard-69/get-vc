import { home, logout } from '@/routes';
import { index as repositoriesIndex } from '@/routes/repositories';
import { Link, usePage } from '@inertiajs/react';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { User } from 'lucide-react';

export default function Navbar() {
    const page = usePage();
    const { auth } = page.props as any;
    const isRepositoriesRoute = page.url.startsWith('/repositories');

    return (
        <header className="sticky top-0 z-50 border-b bg-background">
            <div className="flex h-14 items-center justify-between px-6">
                {/* LEFT: Logo + nav links */}
                <div className="flex items-center gap-6">
                    <Link href={home()} className="text-xl font-semibold">
                        Home Page
                    </Link>

                    {/* Navigation */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={repositoriesIndex()}
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            isRepositoriesRoute
                                                ? 'bg-accent'
                                                : 'hover:bg-muted'
                                        }`}
                                    >
                                        Repositories
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link
                                href="/settings/profile"
                                className="w-full hover:cursor-pointer"
                            >
                                Profile
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link
                                href={logout()}
                                method="post"
                                as="button"
                                className="w-full hover:cursor-pointer"
                            >
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
