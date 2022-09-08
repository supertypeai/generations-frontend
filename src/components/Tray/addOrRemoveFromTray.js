const addOrRemoveFromTray = (tray, id, setTray) => {

    if (tray.includes(id)) {
        console.log(`removing ${id}`)
        let newTray = tray.filter(i => i !== id)
        setTray(newTray)
        console.log(newTray)
    } else {
        setTray([...tray, id]);
    }
}

export default addOrRemoveFromTray