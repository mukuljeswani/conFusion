import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  dishErrMess: string;
  promoErrMess: string;
  leaErrMess: string;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, 
      dishErrmess => this.dishErrMess = <any>dishErrmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, 
      promoErrmess => this.promoErrMess = <any>promoErrmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, 
      leaErrmess => this.leaErrMess = <any>leaErrmess);
  }

}
