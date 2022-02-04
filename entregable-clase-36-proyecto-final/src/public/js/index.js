const userId = user.id;

const listProducts = document.querySelector('.list-products');

const loadProducts = async () => {
    const res = await fetch('/api/productos');
    const products = await res.json();

    listProducts.innerHTML = '';

    let html = '';

    html +=
        '<table class="table is-bordered is-striped table is-fullwidth my-4">';

    html += `<thead>
        <th>NOMBRE</th>
        <th>DESCRIPCIÓN</th>
        <th>FOTO</th>
        <th>STOCK</th>
        <th>PRECIO</th>
    </thead>`;

    html += '<tbody>';
    products.forEach((product) => {
        html += `<tr>
            <td>${product.nombre}</td>
            <td>${product.descripcion}</td>
            <td><img src="${product.foto}" alt="${product.nombre}" width="45px" ></td>
            <td>${product.stock}</td>
            <td>${product.precio}</td>
        </tr>`;
    });

    html += '<tbody>';

    html += '</table>';

    listProducts.innerHTML += html;
};

loadProducts();

const selectCarts = document.getElementById('carts');
const selectProducts = document.getElementById('products');

const loadProductsAndCarts = async () => {
    const [resProducts, resCarts] = await Promise.all([
        fetch('/api/productos'),
        fetch(`/api/carritos/user/${userId}`),
    ]);

    const [products, carts] = await Promise.all([
        resProducts.json(),
        resCarts.json(),
    ]);

    selectCarts.innerHTML = '';

    selectProducts.innerHTML = '';

    let selectCartsHtml;

    let selectProductsHtml;

    selectCartsHtml += `<option disabled selected value> Selecciona un carrito </option>`;

    carts.forEach((cart, index) => {
        selectCartsHtml += `<option value='${cart._id}'>
            Carrito ${index}
        </option>`;
    });

    selectProductsHtml += `<option disabled selected value> Selecciona un producto </option>`;

    products.forEach((product, index) => {
        selectProductsHtml += `<option value='${product._id}'>
            ${product.nombre}
        </option>`;
    });

    selectCarts.innerHTML += selectCartsHtml;
    selectProducts.innerHTML += selectProductsHtml;
};

loadProductsAndCarts();

const listCarts = document.querySelector('.list-carts');

const loadCarts = async () => {
    const res = await fetch(`/api/carritos/user/${userId}`);

    const carts = await res.json();

    listCarts.innerHTML = '';

    carts.forEach((cart, index) => {
        const products = cart.productos;

        let precioTotal = 0;

        let html = '<div class="card my-4 p-4">';

        html += `<div>
            <p class="title is-5">Carrito ${index}</p>
        </div>`;

        html += '<table class="table is-bordered table is-fullwidth my-4">';

        html += `<thead>
            <th>NOMBRE</th>
            <th>DESCRIPCIÓN</th>
            <th>PRECIO</th>
        </thead>`;

        html += '<tbody>';

        products.forEach((product) => {
            precioTotal += product.precio;

            html += `<tr>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio}</td>
            </tr>`;
        });

        html += '<tbody>';

        html += '</table>';

        html += `<p>Cantidad de productos: ${products.length}</p>`;
        html += `<p>Precio total: ${precioTotal}</p>`;
        html += `<button class="button is-small is-danger is-light" onclick="btnDeleteCart('${cart._id}')">Borrar carrito</button>`;
        html += `<button class="button is-small is-link  ml-2 is-light" onclick='btnBuyCart(${JSON.stringify(
            cart,
        )})'>Finalizar compra</button>`;

        html += '</div>';

        listCarts.innerHTML += html;
    });
};

loadCarts();

const createCart = async () => {
    await fetch('/api/carritos', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ userId }),
    });

    loadCarts();

    loadProductsAndCarts();

    loadProducts();
};

const addProductToCart = async (cartId, productId) => {
    await fetch(`/api/carritos/${cartId}/productos`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ productos: [productId] }),
    });

    loadCarts();
};

document.getElementById('btnAddProductToCart').addEventListener('click', () => {
    const cartId = document.getElementById('carts').value;
    const productId = document.getElementById('products').value;

    if (cartId && productId) {
        addProductToCart(cartId, productId);
    }
});

const btnDeleteCart = async (cartId) => {
    await fetch(`/api/carritos/${cartId}`, {
        method: 'DELETE',
    });

    loadCarts();

    loadProductsAndCarts();
};

const btnBuyCart = async (cart) => {
    if (cart.productos.length) {
        await fetch(`/api/orders`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ user, cart }),
        });

        loadCarts();

        loadProductsAndCarts();
    }
};
