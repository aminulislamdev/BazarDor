export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-600">
        <p>
          <strong className="text-gray-900">বাজার দর</strong> — প্রয়োজনীয়
          পণ্যের দাম এক নজরে।
        </p>
        <p className="italic md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}