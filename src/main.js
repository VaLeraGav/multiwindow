const importAll = async () => {
    const context = import.meta.glob('./js/*.js');
    for (const path in context) {
        await context[path]();
    }
};

importAll();
