import {Component, ViewEncapsulation} from '@angular/core';
import {Observable, of} from 'rxjs';

interface ViewData {
    id: string;
    name: string;
    icon: string;
    path: string;
    selected: boolean;
}

const mockData: ViewData[] = [
    {
        id: 'inbox',
        name: 'Inbox',
        icon: 'inbox',
        path: '/',
        selected: true,
    },
    {
        id: 'today',
        name: 'Today',
        icon: 'today',
        path: '/',
        selected: false,
    },
    {
        id: 'upcoming',
        name: 'Upcoming',
        icon: 'upcoming',
        path: '/',
        selected: false,
    },
];

@Component({
    selector: 'app-main-list',
    templateUrl: './main-list.component.html',
    styleUrls: ['./main-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MainListComponent {
    public viewData$: Observable<ViewData[]> = of(mockData);

    public trackByFn(index: number, item: ViewData): string {
        return item.id;
    }
}
