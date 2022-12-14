import { MasterService } from './master.service';
import { TestBed } from '@angular/core/testing'
import { ValueService } from './value.service';
// import {FakeValueService} from './value.services';

fdescribe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });


  //Spy mock que se puede espiar
  it('should  call  to getValue from ValueService', () => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value from Spy')
    expect(masterService.getValue()).toBe('fake value from Spy');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
 //forzar tipado de un servicio fake a otro  fakevalueService as unknown as ValueService



  // it('should return "my value" from the real service', () => {
  //   let valueService =  new ValueService();
  //   let masterService =  new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value');
  // });



  // it('should return "fake value" from the fake service', () => {
  //   let fakevalueService =  new FakeValueService();
  //   let masterService =  new MasterService(fakevalueService as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });


  // it('should  return "other value" from the fake object', () => {
  //   const fake = {getValue: () => 'fake from obj'};
  //   let masterService =  new MasterService(fake as  ValueService );
  //   expect(masterService.getValue()).toBe('fake from obj');
  // });
