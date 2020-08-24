import {dbFinder} from './dataBase.js';

class PetExplorer {
    constructor(dbFinder) {
        this.dbFinder = dbFinder
        this.dbController = dbFinder.db;
        this.td = dbFinder.tablesDescription;
 
    }

    async getPetsOnSale () {
        let querry = `SELECT dog_id, dog_name, birthday, gender,
        image_src FROM dogs INNER JOIN dogs_images_src ON
        dogs_images_src.dog_id = dogs.id AND dogs.on_sale ='1'
        AND dogs_images_src.image_type='avatar' ORDER BY dog_id`
        return {petsOnSale: await this.dbController.directQuerry(querry)};
    }

    async getPetPhotosById (petId) {
        let photosQuerry = {
            table: this.td.imagesTable.name,
            cond: [
                {
                    column: this.td.imagesTable.column.dogId,
                    comparisonSign: '=',
                    comparisonValue: petId
                },
                {
                    column: this.td.imagesTable.column.imageType,
                    comparisonSign: '=',
                    comparisonValue: 'photo'
                }
            ]
        }
        return this.dbFinder.querryWithCond(photosQuerry);
    }

    async getPetsByType (petType) {
        let querry =
        `SELECT dog_id, dog_name, birthday, gender, dog_type, image_src FROM dogs
        INNER JOIN dogs_images_src ON
        dogs_images_src.dog_id = dogs.id
        AND dogs.dog_type='${petType}'
        AND dogs_images_src.image_type='avatar' ORDER BY dog_id`
        
        return this.dbController.directQuerry(querry);
    }

    async getPetsMainInfo () {
        let ourPets = this.getPetsByType('our_dogs');
        let memorial = this.getPetsByType('memorial');
        let graduates = this.getPetsByType('graduates');

        let res = {
            ourPets: await ourPets,
            memorial: await memorial,
            graduates: await graduates
        };

        return res;
    }

    async getPetInfo (petId) {
        let mainTable = 'dogs';
        let healthTable = 'dogs_health'
        let rankTable = 'dogs_ranks'
        let imagesTable = 'dogs_images_src'

        let idColumn = 'id';
        let dependentIdColumn = 'dog_id'

        let avatarQuerry = {
            table: imagesTable,
            cond: [
                {
                    column: 'dog_id',
                    comparisonSign: '=',
                    comparisonValue: petId
                },
                {
                    column: 'image_type',
                    comparisonSign: '=',
                    comparisonValue: 'avatar'
                }
            ]

        }

        let mainInfo = this.dbFinder.querry_with_cond(mainTable, idColumn, petId, true);
        let healthInfo = this.dbFinder.querry_with_cond(healthTable, dependentIdColumn, petId, true);
        let rankInfo = this.dbFinder.querry_with_cond(rankTable, dependentIdColumn, petId);
        let avatarInfo = this.dbFinder.querryWithCond(avatarQuerry, true);

        let res = {
            mainInfo: await mainInfo,
            healthInfo: await healthInfo,
            rankInfo: await rankInfo,
            avatarInfo: await avatarInfo
        };
        // console.log(res);
        return res;
    }
    
}

let petExplorer = new PetExplorer(dbFinder);

export {petExplorer};