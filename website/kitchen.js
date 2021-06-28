async function completeOrder(x) {
    const result = await fetch('/api/orderUpdate', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "id": x,
        })
    }).then((res) => res.json());

    console.log(result);
}