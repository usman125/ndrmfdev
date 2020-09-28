import { Subject, ReplaySubject } from "rxjs";

interface FormValuesState {
  form: any
}

const routeEnd = new Subject<FormValuesState>();
export const formValuesReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => formValuesReplay.next(val));

export const setFormValue = (
  form: any
) => {
  routeEnd.next({
    form: form,
  });
}