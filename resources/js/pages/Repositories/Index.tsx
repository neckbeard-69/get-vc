import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import { Pen, Settings } from 'lucide-react';
import AppLayout from '../Layouts/AppLayout';

function Index({ repos }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        description: '',
        private: false,
    });

    const createRepo = (e: any) => {
        e.preventDefault();
        post('/repositories', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Repositories
                </h1>

                {/* Create repo button + dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            New Repository <Pen />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>New Repository</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={createRepo} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    placeholder="cool-project"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="repo description..."
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between space-x-2 rounded-md border p-2">
                                <div className="space-y-0.5">
                                    <Label>Private Repository</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Only you can access this repository.
                                    </p>
                                </div>

                                <Switch
                                    checked={data.private}
                                    onCheckedChange={(value) =>
                                        setData('private', value)
                                    }
                                />
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Repo list */}
            <div className="grid gap-4">
                {repos.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No repositories yet. Create one!
                    </p>
                )}

                {repos.map((repo) => (
                    <Card key={repo.id} className="transition">
                        <CardHeader>
                            <CardTitle className="flex justify-between text-lg">
                                {repo.name}
                                <Button
                                    variant={'outline'}
                                    onClick={() =>
                                        router.visit(
                                            `/repositories/${repo.id}/edit`,
                                        )
                                    }
                                >
                                    Edit <Settings />
                                </Button>
                            </CardTitle>
                            <CardDescription>
                                {repo.description || 'No description'}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex items-center justify-between">
                            <span
                                className={`text-xs ${
                                    repo.private
                                        ? 'text-red-500'
                                        : 'text-green-600'
                                }`}
                            >
                                {repo.private ? 'Private' : 'Public'}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Index;
