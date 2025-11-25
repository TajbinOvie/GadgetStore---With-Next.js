export function TestimonialsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Card 1 */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition shadow-lg h-full flex flex-col">
          <p className="text-gray-300 italic flex-1">
            "Amazing quality and very fast delivery!"
          </p>
          <h4 className="text-yellow-400 font-bold mt-4">— Rahim</h4>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition shadow-lg h-full flex flex-col">
          <p className="text-gray-300 italic flex-1">
            "Trusted shop. Got exactly what I ordered."
          </p>
          <h4 className="text-yellow-400 font-bold mt-4">— Sabrina</h4>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition shadow-lg h-full flex flex-col">
          <p className="text-gray-300 italic flex-1">
            "Best gadgets at best prices."
          </p>
          <h4 className="text-yellow-400 font-bold mt-4">— Arif</h4>
        </div>

      </div>
    </section>
  );
}

