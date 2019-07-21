import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

function parseDateTime(d) {
    dayjs.extend(utc)
    return dayjs(d)
        .add('7', 'hours')
        .format('DD/MM/YYYY HH:mm')
}

export { parseDateTime }
