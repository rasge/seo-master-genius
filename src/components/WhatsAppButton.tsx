
'use client';

export default function WhatsAppButton() {
  const phoneNumber = "5491112345678"; // Placeholder, as specified in prompt
  const message = encodeURIComponent("Hola, quiero mi auditoría gratis");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-pulse-whatsapp group"
      aria-label="Contactar por WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.237-.038.37.281.144.345.491 1.2.536 1.288.043.09.072.195.014.31-.058.116-.087.188-.174.289l-.26.304c-.087.101-.177.211-.076.385.101.174.45.741.964 1.201.662.591 1.221.774 1.394.86s.289.072.39-.044c.101-.116.433-.506.549-.68.116-.174.231-.144.39-.087s1.011.477 1.184.564c.174.087.289.13.332.202.043.073.043.419-.101.825zM12 2C6.477 2 2 6.477 2 12c0 1.762.457 3.414 1.257 4.854L2 22l5.12-1.296C8.54 21.503 10.201 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.554 0-3.003-.435-4.242-1.192l-.304-.187-3.15.795.811-2.964-.205-.326C4.15 15.018 3.6 13.562 3.6 12c0-4.632 3.768-8.4 8.4-8.4s8.4 3.768 8.4 8.4-3.768 8.4-8.4 8.4z" />
      </svg>
      {/* Tooltip purely for accessibility/visual hint */}
      <span className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
        ¿Te ayudo?
      </span>
    </a>
  );
}
