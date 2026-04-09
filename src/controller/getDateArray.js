export const getDatesArray = (dayOnFirstDay, daysInMonth) => {
    const dates = []
    let row = []
    let d = 1
    for (let i = 0; i < 7; i++) {
        if (i < dayOnFirstDay) {
            row.push(null)
        } else {
            row.push(d)
            d++
        }
    }
    dates.push(row)
    for (let i = 1; i < 5; i++) {
        row = []
        for (let j = 0; j < 7; j++) {
            if (d > daysInMonth) {
                row.push(null)
            } else {
                row.push(d);
                d++
            }
        }
        dates.push(row)

    }
    let i = 0;
    while (d <= daysInMonth) {
        dates[0][i] = d
        d++
        i++
    }
    return dates
}