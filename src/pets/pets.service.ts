import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromiseOrValue } from 'graphql/jsutils/PromiseOrValue';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownerService: OwnersService) { }

    createPet(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = this.petsRepository.create(createPetInput) // newPet = new Pet() -> new.name = name ...

        return this.petsRepository.save(newPet)
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find() // Select * pet
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail(id)
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownerService.findOne(ownerId)
    }
}
