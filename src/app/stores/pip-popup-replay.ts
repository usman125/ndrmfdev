import { Subject, ReplaySubject } from "rxjs";

interface PipPopupState {
  startDate: string,
  endDate: string,
  description: string,
  latitude: string,
  longitude: string,
  ndrmfShare: string,
  fipShare: string,
  isProcurement: boolean,
  procurementHeads: string,
  rfSubmitData: string,
  available: boolean,
}

const routeEnd = new Subject<PipPopupState>();
export const pipPopupReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => pipPopupReplay.next(val));

export const setPipPopupValue = (
  startDate: string,
  endDate: string,
  description: string,
  latitude: string,
  longitude: string,
  ndrmfShare: string,
  fipShare: string,
  isProcurement: boolean,
  procurementHeads: string,
  rfSubmitData: string,
  available: boolean,
) => {
  routeEnd.next({
    startDate: startDate,
    endDate: endDate,
    description: description,
    latitude: latitude,
    longitude: longitude,
    ndrmfShare: ndrmfShare,
    fipShare: fipShare,
    isProcurement: isProcurement,
    procurementHeads: procurementHeads,
    rfSubmitData: rfSubmitData,
    available: available,
  });
}