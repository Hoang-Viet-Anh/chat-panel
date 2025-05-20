export default function Separator({ className }: { className?: string }) {
    return (
        <div className={"w-full border-b-2 border-gray-300 " + className} />
    );
}