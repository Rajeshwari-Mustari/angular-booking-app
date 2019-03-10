import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

    noOfRooms = 0;
    noOfAdults = 0;
    noOfChildren = 0;
    maxNoOfPersonPerRoom=4;
    maxRooms=5;
    maxNoOfChildrenPerAdults=3;

    ngOnInit()
    {
        this.rooms=0;
        this.adults=0;
        this.children=0;
    }


  get rooms() {
    return this.noOfRooms;
  }
  
  set rooms(value) {
    this.noOfRooms = value;
  }

  roomDecrement() {
    if(this.rooms > 1)
        this.rooms--;
        this.removeRoom();
  
    }
  roomIncrement() {
    if(this.rooms < 5){
        this.rooms++;
        this.addRoom()
    }
  }

  set adults(value)
  {
      this.noOfAdults=value;
  }

  get adults()
  {
      return this.noOfAdults;
  }
  decrementAdults() {
     if(this.adults >0 ) {
       if(!(this.adults == this.rooms)){
        this.adults--;
        this.changerooms();
       }else{
        this.adults--;
        this.rooms--;
        if(this.children > this.adults*this.maxNoOfChildrenPerAdults)
        {
            this.children=this.adults*this.maxNoOfChildrenPerAdults;
        }
       
       }
        
      }
      
      if(this.adults == 0)
      {
          this.rooms=0;
          this.children=0;
      }  
   }
  incrementAdults() {
   
    if(this.adults +this.children < 20  ){
      this.adults++;
      if(!(this.rooms*this.maxNoOfPersonPerRoom > (this.adults + this.children)))
            this.changerooms();    
      
    }

}

  set children(value)
  {
      this.noOfChildren=value;
  }

  get  children()
  {
      return this.noOfChildren;
  }
    decrementChildren() {
   if(this.children > 0) {
     this.children--;
     this.changerooms();
   }
   }
  incrementChildren() {
    if(this.adults +this.children < 20){
        if(this.children < this.getNoOfChildren )
        {
            this.children++;
            if((this.rooms*this.maxNoOfPersonPerRoom) < (this.adults + this.adults*this.maxNoOfChildrenPerAdults))
            {
                if(!(this.rooms*this.maxNoOfPersonPerRoom > (this.adults + this.children)))
                    this.changerooms();
            }
            
        }
    }
  }
    
    changerooms()
    {
        console.log(" adults "+this.adults +" children "+this.children);
       
        var total=this.adults+ this.children
       if(total <= this.maxNoOfPersonPerRoom)
       { 
            if(total <= this.maxNoOfPersonPerRoom  * 1 && this.adults >= 1 && this.children <= 3 )
            {
                this.rooms=1;
            }
        }
        else
        {
            var divider = total/4;
            var roomReq =0;

            console.log(" divider "+divider);
            var decimalValue = Math.floor(divider);
            if(!(total % 4 ==0))
              roomReq = decimalValue+1;
             else
              roomReq = decimalValue; 
           
             console.log("room req "+roomReq);
            this.bookRoom(total,roomReq);
        }
  
           
    }

    bookRoom(total , noOfRooms)
    {
        console.log("total "+total+" no of rooms "+noOfRooms);


        if(total <= this.maxNoOfPersonPerRoom  * noOfRooms && total > this.maxNoOfPersonPerRoom  * (noOfRooms-1) && this.adults >= noOfRooms && this.children <= noOfRooms *this.maxNoOfChildrenPerAdults) 
        {
                
                this.rooms=noOfRooms;
        }
    }

     get getNoOfChildren()
    {
        return this.adults*3;
    }

    removeRoom()
    {
        var total = this.adults + this.children;
        if(total > this.rooms * this.maxNoOfPersonPerRoom)
        {
            var diff=total-this.rooms * this.maxNoOfPersonPerRoom;
            if(this.children > diff)
            {
                this.children=this.children-diff;
            } else if(this.children <= diff)
            {
                 diff=diff - this.children;
                this.children=0;    
                if(diff > 0)
                {
                    this.adults=this.adults-diff;
                }
            }

            
        }
    }

    addRoom()
    {
        if(this.adults < 20)
        {
            this.adults++
        }
    }


}
