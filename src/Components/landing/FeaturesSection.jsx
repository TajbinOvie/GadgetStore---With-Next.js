export function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Shop With Us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-yellow-400 transition">
          <h3 className="text-2xl font-bold mb-3 text-yellow-400">Premium Quality</h3>
          <p className="text-gray-300">We provide only the best and fully tested products.</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-yellow-400 transition">
          <h3 className="text-2xl font-bold mb-3 text-yellow-400">Fast Delivery</h3>
          <p className="text-gray-300">Doorstep delivery across Bangladesh within 48 hours.</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-yellow-400 transition">
          <h3 className="text-2xl font-bold mb-3 text-yellow-400">24/7 Support</h3>
          <p className="text-gray-300">Our support team is always available for your help.</p>
        </div>
      </div>
    </section>
  );
}
