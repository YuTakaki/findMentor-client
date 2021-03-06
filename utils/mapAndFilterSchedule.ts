import { schedulesType } from "../types/types";
import moment from "moment";

export const mapAndFilterSchedule = (data : schedulesType[]) => {
  const now = new Date();
  return data.map((_sched: schedulesType) => {
    let startDate = new Date(_sched.startDate);
    let endDate = new Date(_sched.endDate);
    if (_sched.rRule) {
      startDate.setMonth(now.getMonth());
      startDate.setDate(now.getDate());
      startDate.setFullYear(now.getFullYear());

      endDate.setMonth(now.getMonth());
      endDate.setDate(now.getDate());
      endDate.setFullYear(now.getFullYear());
      if (startDate <= now) {
        startDate = new Date(moment(startDate).add(1, 'd').toISOString())
        endDate = new Date(moment(endDate).add(1, 'd').toISOString())
      }

      _sched.endDate = endDate.toString();
      _sched.startDate = startDate.toString();
    }
    return _sched;
  }).filter((_sched : schedulesType) => {
    const startDate = new Date(_sched.startDate);
    if (!_sched.rRule) {
      if(startDate < now) return false
    }
    return true;
  }) 
  
}