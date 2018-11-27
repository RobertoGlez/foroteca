import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; 

@Pipe({name: 'timeago'})
//Version 1
export class TimeAgo implements PipeTransform {
   
    transform(date: string,leng:string):any {
        var finalDate = "Invalid Date";
        var fechaChat = moment(date);
        switch (leng) {
            case "es":
                finalDate = fechaChat.locale('es').fromNow();
                break;
            case "en":
                finalDate = fechaChat.fromNow();
                break;
        
            default:
                finalDate = fechaChat.fromNow();
                break;
        }
        return finalDate;
    }
  }