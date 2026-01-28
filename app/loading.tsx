export default function Loading() {
    return (
        <main className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-40 h-40 object-contain"
            >
                <source src="/loading-placeholder.mp4" type="video/mp4" />
            </video>

            <div className="hidden motion-reduce:block text-sm opacity-60">
                Carregando…
            </div>
        </main>
    );
}
