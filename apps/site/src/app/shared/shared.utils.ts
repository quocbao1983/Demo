import { environment } from "../../environments/environment";
export function GetImage(data:any) {
   const checkhttp =  data.toLowerCase().includes('http')
   const result = checkhttp?data:`${environment.BaseImage+data}`
   return result
}
export function nest(items: any[], id:any = '', link:any = 'pid'):any {
      if (items) {
        return items.filter((item) => item[link] == id)
          .map((item) => ({
            ...item,
            children: nest(items, item.id),
          }));
      };
}
export function sharedFunction(): void {
          // Your shared function logic goes here
}
