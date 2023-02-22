function AccreditationsForm({ formRef, handleSubmit }) {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="credits"
        >
          Cantidad de creditos
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="credits"
          name="credits"
          type="number"
          placeholder="Creditos"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="coupon"
        >
          Cupon
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="coupon"
          name="coupon"
          type="text"
          placeholder="LASMEJORESPELICULAS"
        />
        <p className="text-blue-500 text-xs italic">
          Los cupones no son necesarios para solicitar creditos.
        </p>
        <p className="text-red-500 text-xs italic">
          Los cupones son validos por tiempo limitado.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Solicitar
        </button>
      </div>
    </form>
  );
}

export default AccreditationsForm;
