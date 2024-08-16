import moment from "moment";

export function formatarData(data, formato) {
    return moment(data).format(formato);
}