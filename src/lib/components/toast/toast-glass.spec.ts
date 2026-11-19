import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Subject } from 'rxjs';
import { signal } from '@angular/core';

import { HubToastComponent } from './toast.component';
import { HUB_TOAST_DEFAULT_CONFIG } from '../../services/toast-config.service';

describe('toast glass layer', () => {
	it('marks the toast as a glass surface, so the ds layer can tint and blur it', async () => {
		await TestBed.configureTestingModule({
			imports: [HubToastComponent],
			providers: [provideAnimationsAsync()]
		}).compileComponents();
		const fixture = TestBed.createComponent(HubToastComponent);
		fixture.componentRef.setInput('data', {
			toastId: 1,
			type: 'info',
			message: 'Hello',
			config: { ...HUB_TOAST_DEFAULT_CONFIG },
			onShown$: new Subject<void>(),
			onHidden$: new Subject<void>(),
			onTap$: new Subject<void>(),
			restartToken: signal(0)
		});
		fixture.detectChanges();

		expect(fixture.nativeElement.classList).toContain('hub-toast');
		expect(fixture.nativeElement.classList).toContain('hub-glass-surface');
	});
});
