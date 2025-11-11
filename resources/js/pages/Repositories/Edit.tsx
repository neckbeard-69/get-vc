import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

function Edit({ repo }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: repo.name,
        description: repo.description || '',
        private: repo.private,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/repositories/${repo.id}`);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 py-10">
            <Button
                variant={'outline'}
                onClick={() => router.visit('/repositories')}
            >
                Go back
            </Button>
            <h1 className="text-2xl font-bold">Edit Repository</h1>

            <form className="space-y-4" onSubmit={submit}>
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between rounded border p-2">
                    <div>
                        <Label>Private Repo</Label>
                    </div>
                    <Switch
                        checked={data.private}
                        onCheckedChange={(v) => setData('private', v)}
                    />
                </div>

                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
        </div>
    );
}
Edit.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Edit;
