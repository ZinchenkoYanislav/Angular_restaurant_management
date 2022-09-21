import { Observable, Subject } from "rxjs";
import { EventArgs } from "./event-args";
import { EventType } from "./event-type";

export abstract class BaseService<T> {
    private changesSubject: Subject<EventArgs<T>>;

    constructor() {
        this.changesSubject = new Subject();
    }

    public get changes(): Observable<EventArgs<T>> {
        return this.changesSubject.asObservable();
    }

    protected onChanges(type: EventType, data: T[]) {
        this.changesSubject.next({
            type: type,
            data: data,
        });
    }

    public abstract getAll(): Observable<T[]>;
    // public abstract getById(id: number): Observable<T>;
    public abstract create(item: T): Observable<T>;
    // public abstract update(item: T): Observable<T>;
    public abstract delete(item: T): Observable<T>;
    public abstract update(item: T): Observable<T>;
}
