import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEstabelecimentoComponent } from './dados-estabelecimento.component';

describe('DadosEstabelecimentoComponent', () => {
  let component: DadosEstabelecimentoComponent;
  let fixture: ComponentFixture<DadosEstabelecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosEstabelecimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
